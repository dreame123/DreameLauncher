const { app, BrowserWindow, Menu, clipboard, dialog, ipcMain, shell } = require("electron");
const { spawn } = require("child_process");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const appDataRoot = path.join(process.env.LOCALAPPDATA || app.getPath("userData"), "Dreame Launcher");
const settingsPath = path.join(appDataRoot, "settings.json");
const accountsPath = path.join(appDataRoot, "accounts.json");
const xalTokensPath = path.join(appDataRoot, "xal.tokens.json");
const instancesMetaPath = path.join(appDataRoot, "instances.json");
const skinsMetaPath = path.join(appDataRoot, "skins.json");
const recentServersPath = path.join(appDataRoot, "recent-servers.json");
const bundledMicrosoftClientId = process.env.DREAME_MICROSOFT_CLIENT_ID || "00000000402b5328";
let pendingXalRedirect = null;
const runningProcesses = new Map();
const transparentTitleBarColor = "rgba(0, 0, 0, 0)";

const defaultSettings = {
  accent: "#7c5cff",
  theme: "color",
  playerName: "DreamePlayer",
  selectedVersion: "Latest Release",
  ram: 4,
  microsoftClientId: "",
  activeAccountId: null,
  lastOpenedAt: null
};

function ensureLauncherData() {
  const folders = [
    appDataRoot,
    path.join(appDataRoot, "assets"),
    path.join(appDataRoot, "cache"),
    path.join(appDataRoot, "instances"),
    path.join(appDataRoot, "logs"),
    path.join(appDataRoot, "skins"),
    path.join(appDataRoot, "versions")
  ];

  for (const folder of folders) {
    fs.mkdirSync(folder, { recursive: true });
  }

  if (!fs.existsSync(settingsPath)) {
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2));
  }

  if (!fs.existsSync(accountsPath)) {
    fs.writeFileSync(accountsPath, JSON.stringify({ accounts: [] }, null, 2));
  }

  if (!fs.existsSync(skinsMetaPath)) {
    fs.writeFileSync(skinsMetaPath, JSON.stringify({ skins: [], activeSkinId: null, activeSkinByAccount: {} }, null, 2));
  }

  if (!fs.existsSync(instancesMetaPath)) {
    fs.writeFileSync(instancesMetaPath, JSON.stringify({ instances: [] }, null, 2));
  }

  if (!fs.existsSync(recentServersPath)) {
    fs.writeFileSync(recentServersPath, JSON.stringify({ servers: [] }, null, 2));
  }
}

function readSettings() {
  ensureLauncherData();
  try {
    return { ...defaultSettings, ...JSON.parse(fs.readFileSync(settingsPath, "utf8")) };
  } catch {
    fs.writeFileSync(settingsPath, JSON.stringify(defaultSettings, null, 2));
    return defaultSettings;
  }
}

function normalizeHexColor(color) {
  const value = String(color || "").trim();
  if (/^#[0-9a-f]{6}$/i.test(value)) return value;
  if (/^#[0-9a-f]{3}$/i.test(value)) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }
  return defaultSettings.accent;
}

function titleBarSymbolColor(color) {
  const value = normalizeHexColor(color).slice(1);
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  return luminance > 0.62 ? "#111827" : "#f6f7fb";
}

function applyTitleBarColorToWindow(win, color) {
  if (!win || typeof win.setTitleBarOverlay !== "function") return;
  try {
    win.setTitleBarOverlay({
      color: transparentTitleBarColor,
      symbolColor: "#f6f7fb",
      height: 52
    });
  } catch {
    // Some platforms do not support title bar overlays.
  }
}

function applyTitleBarColor(color) {
  for (const win of BrowserWindow.getAllWindows()) {
    applyTitleBarColorToWindow(win, color);
  }
}

function writeSettings(nextSettings) {
  ensureLauncherData();
  const settings = { ...readSettings(), ...nextSettings, lastOpenedAt: new Date().toISOString() };
  fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  return settings;
}

function readAccounts() {
  ensureLauncherData();
  try {
    const data = JSON.parse(fs.readFileSync(accountsPath, "utf8"));
    return { accounts: Array.isArray(data.accounts) ? data.accounts : [] };
  } catch {
    const empty = { accounts: [] };
    fs.writeFileSync(accountsPath, JSON.stringify(empty, null, 2));
    return empty;
  }
}

function writeAccounts(accounts) {
  ensureLauncherData();
  fs.writeFileSync(accountsPath, JSON.stringify({ accounts }, null, 2));
  return { accounts };
}

function readRecentServers() {
  ensureLauncherData();
  try {
    const data = JSON.parse(fs.readFileSync(recentServersPath, "utf8"));
    return Array.isArray(data.servers) ? data.servers : [];
  } catch {
    fs.writeFileSync(recentServersPath, JSON.stringify({ servers: [] }, null, 2));
    return [];
  }
}

function rememberRecentServer(server) {
  const current = readRecentServers();
  const entry = {
    id: `${server.instanceId}:${server.address}`,
    instanceId: server.instanceId,
    address: server.address,
    title: server.title || server.address,
    iconUrl: server.iconUrl || `https://api.mcsrvstat.us/icon/${encodeURIComponent(server.address)}`,
    description: server.description || "",
    lastJoinedAt: new Date().toISOString()
  };
  const servers = [entry, ...current.filter((item) => item.id !== entry.id)].slice(0, 12);
  fs.writeFileSync(recentServersPath, JSON.stringify({ servers }, null, 2));
  return servers;
}

function parseNbt(buffer) {
  let offset = 0;
  const requireBytes = (count) => {
    if (offset + count > buffer.length) throw new Error("Invalid NBT data.");
  };
  const readByte = () => {
    requireBytes(1);
    return buffer.readUInt8(offset++);
  };
  const readShort = () => {
    requireBytes(2);
    const value = buffer.readInt16BE(offset);
    offset += 2;
    return value;
  };
  const readUShort = () => {
    requireBytes(2);
    const value = buffer.readUInt16BE(offset);
    offset += 2;
    return value;
  };
  const readInt = () => {
    requireBytes(4);
    const value = buffer.readInt32BE(offset);
    offset += 4;
    return value;
  };
  const readString = () => {
    const length = readUShort();
    requireBytes(length);
    const value = buffer.toString("utf8", offset, offset + length);
    offset += length;
    return value;
  };
  const readPayload = (type) => {
    switch (type) {
      case 1:
        requireBytes(1);
        return buffer.readInt8(offset++);
      case 2:
        return readShort();
      case 3:
        return readInt();
      case 4: {
        requireBytes(8);
        const value = Number(buffer.readBigInt64BE(offset));
        offset += 8;
        return value;
      }
      case 5: {
        requireBytes(4);
        const value = buffer.readFloatBE(offset);
        offset += 4;
        return value;
      }
      case 6: {
        requireBytes(8);
        const value = buffer.readDoubleBE(offset);
        offset += 8;
        return value;
      }
      case 7: {
        const length = readInt();
        requireBytes(length);
        const value = buffer.subarray(offset, offset + length);
        offset += length;
        return value;
      }
      case 8:
        return readString();
      case 9: {
        const itemType = readByte();
        const length = readInt();
        const items = [];
        for (let index = 0; index < length; index += 1) {
          items.push(readPayload(itemType));
        }
        return items;
      }
      case 10: {
        const compound = {};
        while (true) {
          const tagType = readByte();
          if (tagType === 0) break;
          const name = readString();
          compound[name] = readPayload(tagType);
        }
        return compound;
      }
      case 11: {
        const length = readInt();
        const values = [];
        for (let index = 0; index < length; index += 1) values.push(readInt());
        return values;
      }
      case 12: {
        const length = readInt();
        const values = [];
        for (let index = 0; index < length; index += 1) {
          requireBytes(8);
          values.push(Number(buffer.readBigInt64BE(offset)));
          offset += 8;
        }
        return values;
      }
      default:
        throw new Error(`Unsupported NBT tag type ${type}.`);
    }
  };

  const rootType = readByte();
  if (rootType !== 10) throw new Error("Expected NBT root compound.");
  readString();
  return readPayload(rootType);
}

function readNbtFile(filePath) {
  let buffer = fs.readFileSync(filePath);
  if (buffer[0] === 0x1f && buffer[1] === 0x8b) {
    buffer = zlib.gunzipSync(buffer);
  }
  return parseNbt(buffer);
}

function normalizeServerIcon(icon) {
  const value = String(icon || "").trim();
  if (!value) return "";
  if (value.startsWith("data:image/")) return value;
  if (/^[a-z0-9+/]+=*$/i.test(value)) return `data:image/png;base64,${value}`;
  return value;
}

function readInstanceSavedServers(instance) {
  const serversPath = path.join(instance.path, "servers.dat");
  if (!fs.existsSync(serversPath)) return [];
  try {
    const stat = fs.statSync(serversPath);
    const root = readNbtFile(serversPath);
    const servers = Array.isArray(root.servers) ? root.servers : [];
    return servers
      .map((server) => {
        const address = String(server.ip || "").trim();
        if (!address) return null;
        const title = String(server.name || address).trim();
        return {
          id: `${instance.id}:${address}`,
          instanceId: instance.id,
          address,
          title,
          iconUrl: normalizeServerIcon(server.icon) || `https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`,
          description: server.motd || "",
          lastJoinedAt: stat.mtime.toISOString(),
          source: "servers.dat"
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.warn(`Could not read saved servers for ${instance.name}:`, error.message);
    return [];
  }
}

function readRecentServersForRenderer() {
  const byId = new Map();
  for (const instance of readInstances().instances) {
    for (const server of readInstanceSavedServers(instance)) {
      byId.set(server.id, server);
    }
  }
  for (const server of readRecentServers()) {
    const existing = byId.get(server.id) || {};
    byId.set(server.id, {
      ...existing,
      ...server,
      title: server.title || existing.title,
      iconUrl: server.iconUrl || existing.iconUrl,
      description: server.description || existing.description || "",
      lastJoinedAt: server.lastJoinedAt || existing.lastJoinedAt
    });
  }
  return [...byId.values()]
    .sort((left, right) => new Date(right.lastJoinedAt || 0) - new Date(left.lastJoinedAt || 0));
}

function readSkins() {
  ensureLauncherData();
  const empty = { skins: [], activeSkinId: null, activeSkinByAccount: {} };
  try {
    const data = JSON.parse(fs.readFileSync(skinsMetaPath, "utf8"));
    return {
      skins: Array.isArray(data.skins) ? data.skins : [],
      activeSkinId: data.activeSkinId || null,
      activeSkinByAccount: data.activeSkinByAccount && typeof data.activeSkinByAccount === "object" ? data.activeSkinByAccount : {}
    };
  } catch {
    fs.writeFileSync(skinsMetaPath, JSON.stringify(empty, null, 2));
    return empty;
  }
}

function writeSkins(data) {
  ensureLauncherData();
  const next = { ...readSkins(), ...data };
  fs.writeFileSync(skinsMetaPath, JSON.stringify(next, null, 2));
  return next;
}

function skinToPublicRecord(skin) {
  let dataUrl = "";
  try {
    const buffer = fs.readFileSync(skin.path);
    dataUrl = `data:image/png;base64,${buffer.toString("base64")}`;
  } catch {
    dataUrl = "";
  }
  return { ...skin, dataUrl };
}

function readSkinsForRenderer(accountId = readSettings().activeAccountId) {
  const data = readSkins();
  return {
    activeSkinId: accountId ? data.activeSkinByAccount[accountId] || null : data.activeSkinId || null,
    activeSkinByAccount: data.activeSkinByAccount,
    skins: data.skins.filter((skin) => fs.existsSync(skin.path)).map(skinToPublicRecord)
  };
}

function requireActiveAccount() {
  const activeAccountId = readSettings().activeAccountId;
  if (!activeAccountId) throw new Error("You are not logged in. Login first to use skins.");
  const account = readAccounts().accounts.find((item) => item.id === activeAccountId);
  if (!account) throw new Error("You are not logged in. Login first to use skins.");
  return account;
}

function isMinecraftAccount(account) {
  return account?.type !== "offline" && Boolean(account?.minecraftAccessToken);
}

function requireActiveMinecraftAccount() {
  const account = requireActiveAccount();
  if (!isMinecraftAccount(account)) {
    throw new Error("You need a Minecraft Java account to use skins. The selected account is offline.");
  }
  return account;
}

function decodeSkinDataUrl(dataUrl) {
  const match = String(dataUrl || "").match(/^data:image\/png;base64,([A-Za-z0-9+/=]+)$/);
  if (!match) throw new Error("Upload a PNG Minecraft skin file.");
  return Buffer.from(match[1], "base64");
}

function saveSkinUpload({ name, dataUrl, variant }) {
  const account = requireActiveAccount();
  const buffer = decodeSkinDataUrl(dataUrl);
  if (buffer.length > 1024 * 1024) throw new Error("Skin PNG is too large.");

  const id = crypto.randomUUID();
  const cleanName = String(name || "Uploaded skin").replace(/[<>:"/\\|?*\x00-\x1F]/g, "").trim() || "Uploaded skin";
  const filePath = path.join(appDataRoot, "skins", `${id}.png`);
  fs.writeFileSync(filePath, buffer);

  const data = readSkins();
  const skin = {
    id,
    name: cleanName,
    path: filePath,
    variant: variant === "slim" ? "slim" : "classic",
    addedAt: new Date().toISOString()
  };
  const nextActiveByAccount = { ...data.activeSkinByAccount, [account.id]: id };
  const next = writeSkins({ skins: [skin, ...data.skins], activeSkinId: id, activeSkinByAccount: nextActiveByAccount });
  return {
    ...next,
    activeSkinId: id,
    skins: next.skins.map(skinToPublicRecord)
  };
}

async function uploadSkinToMinecraftProfile(account, skin) {
  if (!isMinecraftAccount(account)) {
    return { uploaded: false, reason: "Skin saved locally. Login with a Microsoft Java account to change your online skin." };
  }

  account = await ensureFreshMinecraftAccount(account);
  const form = new FormData();
  const buffer = fs.readFileSync(skin.path);
  form.append("variant", skin.variant === "slim" ? "slim" : "classic");
  form.append("file", new Blob([buffer], { type: "image/png" }), `${skin.id}.png`);

  const response = await fetch("https://api.minecraftservices.com/minecraft/profile/skins", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${account.minecraftAccessToken}`
    },
    body: form
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Minecraft skin upload failed (${response.status}). ${body}`.trim());
  }

  return { uploaded: true };
}

async function refreshMinecraftProfileSkin() {
  let account = requireActiveAccount();
  if (!isMinecraftAccount(account)) {
    return {
      ...readSkinsForRenderer(account.id),
      refreshed: false,
      message: "You need a Minecraft Java account to use skins. The selected account is offline."
    };
  }

  try {
    account = await ensureFreshMinecraftAccount(account);
  } catch (error) {
    if (error.code !== "MICROSOFT_RELOGIN_REQUIRED") throw error;
    return {
      ...readSkinsForRenderer(account.id),
      refreshed: false,
      message: error.message
    };
  }

  const profile = await getJson("https://api.minecraftservices.com/minecraft/profile", {
    Authorization: `Bearer ${account.minecraftAccessToken}`
  });
  const profileSkin = Array.isArray(profile.skins)
    ? profile.skins.find((skin) => skin.state === "ACTIVE") || profile.skins[0]
    : null;

  if (!profileSkin?.url) {
    return {
      ...readSkinsForRenderer(account.id),
      refreshed: false,
      message: "Minecraft did not return a custom skin for this account."
    };
  }

  const response = await fetch(profileSkin.url);
  if (!response.ok) throw new Error(`Could not download your Minecraft skin (${response.status}).`);
  const buffer = Buffer.from(await response.arrayBuffer());

  const id = `profile-${account.id}`;
  const filePath = path.join(appDataRoot, "skins", `${id}.png`);
  fs.writeFileSync(filePath, buffer);

  const data = readSkins();
  const skin = {
    id,
    name: `${profile.name || account.name}'s current skin`,
    path: filePath,
    variant: String(profileSkin.variant || "classic").toLowerCase() === "slim" ? "slim" : "classic",
    source: "minecraft-profile",
    addedAt: new Date().toISOString()
  };
  const skins = data.skins.some((item) => item.id === id)
    ? data.skins.map((item) => item.id === id ? { ...item, ...skin } : item)
    : [skin, ...data.skins];
  const activeSkinByAccount = { ...data.activeSkinByAccount, [account.id]: id };
  writeSkins({ skins, activeSkinId: id, activeSkinByAccount });

  return {
    ...readSkinsForRenderer(account.id),
    refreshed: true,
    message: "Loaded your current Minecraft skin."
  };
}

function readInstances() {
  ensureLauncherData();
  try {
    const data = JSON.parse(fs.readFileSync(instancesMetaPath, "utf8"));
    return { instances: Array.isArray(data.instances) ? data.instances : [] };
  } catch {
    const empty = { instances: [] };
    fs.writeFileSync(instancesMetaPath, JSON.stringify(empty, null, 2));
    return empty;
  }
}

function writeInstances(instances) {
  ensureLauncherData();
  fs.writeFileSync(instancesMetaPath, JSON.stringify({ instances }, null, 2));
  return { instances };
}

function slugify(value) {
  return String(value || "instance")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "instance";
}

function uniqueInstanceFolder(name) {
  const root = path.join(appDataRoot, "instances");
  const base = slugify(name);
  let candidate = path.join(root, base);
  let index = 2;

  while (fs.existsSync(candidate)) {
    candidate = path.join(root, `${base}-${index}`);
    index += 1;
  }

  return candidate;
}

function ensureInstanceFolders(instancePath) {
  for (const folder of ["mods", "config", "resourcepacks", "shaderpacks", "datapacks", "saves", "screenshots", "logs", "debug", "crash-reports"]) {
    fs.mkdirSync(path.join(instancePath, folder), { recursive: true });
  }
}

function normalizeInstance(input, existing) {
  const now = new Date().toISOString();
  const name = String(input.name || existing?.name || "New instance").trim().slice(0, 80);
  const instancePath = existing?.path || uniqueInstanceFolder(name);

  fs.mkdirSync(instancePath, { recursive: true });
  ensureInstanceFolders(instancePath);

  return {
    id: existing?.id || crypto.randomUUID(),
    name,
    iconPath: input.iconPath || existing?.iconPath || "",
    loader: input.loader || existing?.loader || "vanilla",
    gameVersion: input.gameVersion || existing?.gameVersion || "latest-release",
    loaderVersionType: input.loaderVersionType || existing?.loaderVersionType || "stable",
    loaderVersion: input.loaderVersion || existing?.loaderVersion || "",
    javaVersion: Number(input.javaVersion || existing?.javaVersion || 17),
    javaPath: input.javaPath || existing?.javaPath || "",
    ramMb: Number(input.ramMb || existing?.ramMb || 4096),
    resolution: input.resolution || existing?.resolution || "854x480",
    fullscreen: Boolean(input.fullscreen ?? existing?.fullscreen ?? false),
    extraJvmArgs: input.extraJvmArgs || existing?.extraJvmArgs || "",
    gameDirMode: input.gameDirMode || existing?.gameDirMode || "isolated",
    modrinthProjectId: input.modrinthProjectId || existing?.modrinthProjectId || "",
    modrinthVersionId: input.modrinthVersionId || existing?.modrinthVersionId || "",
    modrinthFileName: input.modrinthFileName || existing?.modrinthFileName || "",
    path: instancePath,
    createdAt: existing?.createdAt || now,
    updatedAt: now
  };
}

function upsertInstance(input) {
  const current = readInstances().instances;
  const existing = current.find((item) => item.id === input.id);
  const instance = normalizeInstance(input, existing);
  const next = existing
    ? current.map((item) => (item.id === instance.id ? instance : item))
    : [...current, instance];

  writeInstances(next);
  return instance;
}

async function upsertInstanceWithPreparation(input, sender = null) {
  const current = readInstances().instances;
  const existing = current.find((item) => item.id === input.id);
  const instance = normalizeInstance(input, existing);
  const updateProgress = createInstanceProgress(sender, instance);

  updateProgress(1, `Preparing ${instance.name}`);
  await prepareMinecraftFiles(instance, updateProgress);

  const next = existing
    ? current.map((item) => (item.id === instance.id ? instance : item))
    : [...current, instance];

  writeInstances(next);
  updateProgress(100, "Instance ready");
  return instance;
}

function removeInstance(instanceId) {
  const next = readInstances().instances.filter((item) => item.id !== instanceId);
  return writeInstances(next);
}

function copyFileIntoInstance(instanceId, sourcePath, targetFolder) {
  const instance = readInstances().instances.find((item) => item.id === instanceId);
  if (!instance) throw new Error("Instance not found.");

  const allowed = new Set(["mods", "config", "resourcepacks", "shaderpacks", "datapacks", "saves", "logs"]);
  const folder = allowed.has(targetFolder) ? targetFolder : "mods";
  const destinationDir = path.join(instance.path, folder);
  fs.mkdirSync(destinationDir, { recursive: true });

  const destination = path.join(destinationDir, path.basename(sourcePath));
  const stat = fs.statSync(sourcePath);
  if (stat.isDirectory()) {
    fs.cpSync(sourcePath, destination, { recursive: true, force: true });
  } else {
    fs.copyFileSync(sourcePath, destination);
  }
  return destination;
}

function guessContentFolder(sourcePath, requestedFolder) {
  if (requestedFolder && requestedFolder !== "all") return requestedFolder;

  const ext = path.extname(sourcePath).toLowerCase();
  const name = path.basename(sourcePath).toLowerCase();

  if (ext === ".jar") return "mods";
  if (ext === ".zip" || ext === ".mcpack") return "resourcepacks";
  if (name.includes("shader")) return "shaderpacks";
  return "mods";
}

function getInstance(instanceId) {
  const instance = readInstances().instances.find((item) => item.id === instanceId);
  if (!instance) throw new Error("Instance not found.");
  return instance;
}

function assertInsideInstance(instance, targetPath) {
  const root = path.resolve(instance.path);
  const resolved = path.resolve(targetPath);
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    throw new Error("Refusing to access a file outside this instance.");
  }
  return resolved;
}

function getMimeType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".gif") return "image/gif";
  if (ext === ".webp") return "image/webp";
  return "";
}

function readZipEntries(archivePath) {
  const buffer = fs.readFileSync(archivePath);
  const minEnd = Math.max(0, buffer.length - 66000);
  let endOffset = -1;

  for (let index = buffer.length - 22; index >= minEnd; index -= 1) {
    if (buffer.readUInt32LE(index) === 0x06054b50) {
      endOffset = index;
      break;
    }
  }

  if (endOffset < 0) return { buffer, entries: [] };

  const entryCount = buffer.readUInt16LE(endOffset + 10);
  const centralOffset = buffer.readUInt32LE(endOffset + 16);
  const entries = [];
  let offset = centralOffset;

  for (let index = 0; index < entryCount; index += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) break;
    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const uncompressedSize = buffer.readUInt32LE(offset + 24);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localHeaderOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.toString("utf8", offset + 46, offset + 46 + nameLength).replaceAll("\\", "/");

    entries.push({ name, method, compressedSize, uncompressedSize, localHeaderOffset });
    offset += 46 + nameLength + extraLength + commentLength;
  }

  return { buffer, entries };
}

function readZipEntry(zip, entry, maxSize = 1024 * 1024) {
  if (!entry || (maxSize && entry.uncompressedSize > maxSize)) return null;
  const { buffer } = zip;
  const offset = entry.localHeaderOffset;
  if (buffer.readUInt32LE(offset) !== 0x04034b50) return null;

  const nameLength = buffer.readUInt16LE(offset + 26);
  const extraLength = buffer.readUInt16LE(offset + 28);
  const dataStart = offset + 30 + nameLength + extraLength;
  const compressed = buffer.subarray(dataStart, dataStart + entry.compressedSize);

  if (entry.method === 0) return compressed;
  if (entry.method === 8) return zlib.inflateRawSync(compressed);
  return null;
}

function findZipEntry(zip, names) {
  const wanted = new Set(names.map((name) => name.toLowerCase()));
  return zip.entries.find((entry) => wanted.has(entry.name.toLowerCase()));
}

function parseIconPathFromJson(buffer) {
  try {
    const parsed = JSON.parse(buffer.toString("utf8"));
    if (typeof parsed.icon === "string") return parsed.icon;
    if (parsed.icon && typeof parsed.icon === "object") {
      return parsed.icon["128"] || parsed.icon["64"] || parsed.icon["32"] || Object.values(parsed.icon)[0];
    }
  } catch {
    return "";
  }
  return "";
}

function parseLogoPathFromToml(buffer) {
  const match = buffer.toString("utf8").match(/logoFile\s*=\s*["']([^"']+)["']/i);
  return match?.[1] || "";
}

function iconDataUrl(zip, iconPath) {
  if (!iconPath) return "";
  const entry = findZipEntry(zip, [iconPath]);
  const mime = getMimeType(entry?.name || iconPath);
  if (!entry || !mime) return "";
  const data = readZipEntry(zip, entry);
  if (!data) return "";
  return `data:${mime};base64,${data.toString("base64")}`;
}

function extractArchiveIcon(fullPath, folder) {
  const zip = readZipEntries(fullPath);
  if (zip.entries.length === 0) return "";

  const metadataNames = ["fabric.mod.json", "quilt.mod.json", "META-INF/mods.toml", "META-INF/neoforge.mods.toml"];
  for (const metadataName of metadataNames) {
    const metadataEntry = findZipEntry(zip, [metadataName]);
    const metadata = metadataEntry ? readZipEntry(zip, metadataEntry) : null;
    if (!metadata) continue;

    const iconPath = metadataName.endsWith(".json")
      ? parseIconPathFromJson(metadata)
      : parseLogoPathFromToml(metadata);
    const dataUrl = iconDataUrl(zip, iconPath);
    if (dataUrl) return dataUrl;
  }

  const directNames = folder === "mods"
    ? ["icon.png", "logo.png", "pack.png"]
    : ["pack.png", "icon.png", "logo.png"];
  const direct = findZipEntry(zip, directNames);
  const directData = iconDataUrl(zip, direct?.name);
  if (directData) return directData;

  const fallback = zip.entries.find((entry) => /(^|\/)(icon|logo)\.(png|jpe?g|gif|webp)$/i.test(entry.name));
  return iconDataUrl(zip, fallback?.name);
}

function getEntryIcon(fullPath, cleanName, folder, type) {
  if (type === "folder") return { kind: "folder", label: "Folder", dataUrl: "" };
  const ext = path.extname(cleanName).toLowerCase();
  const archiveLike = [".jar", ".zip", ".mcpack"].includes(ext);

  if (archiveLike) {
    try {
      const dataUrl = extractArchiveIcon(fullPath, folder);
      if (dataUrl) return { kind: "image", label: "Logo", dataUrl };
    } catch {
      // Fall back to a type badge when the archive is unreadable or has no icon.
    }
  }

  if (folder === "mods") return { kind: "badge", label: "MOD", dataUrl: "" };
  if (folder === "resourcepacks") return { kind: "badge", label: "RP", dataUrl: "" };
  if (folder === "shaderpacks") return { kind: "badge", label: "SH", dataUrl: "" };
  if (folder === "config") return { kind: "badge", label: "CFG", dataUrl: "" };
  return { kind: "badge", label: "FILE", dataUrl: "" };
}

function listFolderEntries(instanceId, folder) {
  const instance = getInstance(instanceId);
  const allowed = new Set(["mods", "config", "resourcepacks", "shaderpacks", "datapacks", "saves", "logs", "debug", "crash-reports"]);
  const safeFolder = allowed.has(folder) ? folder : "mods";
  const folderPath = assertInsideInstance(instance, path.join(instance.path, safeFolder));
  fs.mkdirSync(folderPath, { recursive: true });

  return fs.readdirSync(folderPath, { withFileTypes: true }).map((entry) => {
    const fullPath = path.join(folderPath, entry.name);
    const stat = fs.statSync(fullPath);
    const disabled = entry.name.endsWith(".disabled");
    const cleanName = disabled ? entry.name.replace(/\.disabled$/, "") : entry.name;
    const type = entry.isDirectory() ? "folder" : "file";

    return {
      name: cleanName,
      fileName: entry.name,
      folder: safeFolder,
      path: fullPath,
      type,
      size: stat.size,
      modifiedAt: stat.mtime.toISOString(),
      icon: getEntryIcon(fullPath, cleanName, safeFolder, type),
      enabled: !disabled
    };
  }).sort((a, b) => {
    if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

function removeInstanceEntry(instanceId, folder, fileName) {
  const instance = getInstance(instanceId);
  const target = assertInsideInstance(instance, path.join(instance.path, folder, fileName));
  fs.rmSync(target, { recursive: true, force: true });
  return listFolderEntries(instanceId, folder);
}

function toggleInstanceEntry(instanceId, folder, fileName, enabled) {
  const instance = getInstance(instanceId);
  const current = assertInsideInstance(instance, path.join(instance.path, folder, fileName));
  const next = enabled
    ? current.replace(/\.disabled$/, "")
    : current.endsWith(".disabled") ? current : `${current}.disabled`;

  if (current !== next && fs.existsSync(current)) {
    fs.renameSync(current, assertInsideInstance(instance, next));
  }

  return listFolderEntries(instanceId, folder);
}

function modrinthProjectType(type) {
  return {
    modpacks: "modpack",
    mods: "mod",
    resourcepacks: "resourcepack",
    datapacks: "datapack",
    shaders: "shader",
    servers: "server"
  }[type] || "modpack";
}

function modrinthInstallFolder(projectType) {
  return {
    mod: "mods",
    resourcepack: "resourcepacks",
    shader: "shaderpacks",
    datapack: "datapacks"
  }[projectType] || "mods";
}

const serverDirectory = [
  {
    title: "Hypixel",
    address: "mc.hypixel.net",
    description: "Large minigame network with SkyBlock, Bed Wars, SkyWars, and arcade games.",
    categories: ["minigames", "network", "premium"],
    versions: ["1.8.9", "1.20", "1.21"]
  },
  {
    title: "DonutSMP",
    address: "donutsmp.net",
    description: "Survival SMP network with economy, PvP, teams, and frequent events.",
    categories: ["smp", "survival", "pvp"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "Wynncraft",
    address: "play.wynncraft.com",
    description: "Minecraft MMORPG server with quests, classes, dungeons, and custom progression.",
    categories: ["rpg", "quests", "mmo"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "CubeCraft",
    address: "play.cubecraft.net",
    description: "Minigames network with SkyWars, EggWars, parkour, and seasonal games.",
    categories: ["minigames", "network", "premium"],
    versions: ["1.19", "1.20", "1.21"]
  },
  {
    title: "Minehut",
    address: "mc.minehut.com",
    description: "Server hub for joining community-hosted Minecraft servers.",
    categories: ["hub", "community", "survival"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "PvP Legacy",
    address: "play.pvplegacy.net",
    description: "Practice PvP server with customizable kits and duels.",
    categories: ["pvp", "duels", "practice"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "PikaNetwork",
    address: "play.pika-network.net",
    description: "Offline-mode friendly network with survival, minigames, factions, and skyblock.",
    categories: ["offline-mode", "minigames", "skyblock"],
    versions: ["1.8", "1.20", "1.21"]
  },
  {
    title: "Blocksmc",
    address: "play.blocksmc.com",
    description: "Offline-mode friendly minigame network with BedWars, SkyWars, and PvP.",
    categories: ["offline-mode", "minigames", "pvp"],
    versions: ["1.8", "1.20", "1.21"]
  },
  {
    title: "Complex Gaming",
    address: "hub.mc-complex.com",
    description: "Network with Pixelmon, survival, prison, skyblock, and custom game modes.",
    categories: ["pixelmon", "survival", "network"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "Purple Prison",
    address: "purpleprison.net",
    description: "Prison server with economy, PvP, plots, and progression.",
    categories: ["prison", "economy", "pvp"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "MCC Island",
    address: "play.mccisland.net",
    description: "Public minigame server from Noxcrew with polished team games and events.",
    categories: ["minigames", "network", "premium"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "ManaCube",
    address: "play.manacube.com",
    description: "Long-running network with parkour, survival, skyblock, factions, and prison.",
    categories: ["parkour", "survival", "skyblock"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "OPBlocks",
    address: "hub.opblocks.com",
    description: "Candy-themed prison, skyblock, survival, and SMP network.",
    categories: ["prison", "skyblock", "survival"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "Applecraft",
    address: "play.applecraft.org",
    description: "Large survival server focused on building, claims, economy, and community.",
    categories: ["survival", "economy", "community"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "EarthMC",
    address: "play.earthmc.net",
    description: "Towny earth map server with nations, economy, diplomacy, and survival.",
    categories: ["towny", "earth", "survival"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "BlossomCraft",
    address: "play.blossomcraft.org",
    description: "Cozy survival server with economy, land claiming, crates, and community events.",
    categories: ["survival", "economy", "community"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "GommeHD",
    address: "gommehd.net",
    description: "German minigame network with BedWars, SkyWars, CityBuild, and PvP modes.",
    categories: ["minigames", "bedwars", "pvp"],
    versions: ["1.8", "1.20", "1.21"]
  },
  {
    title: "CraftYourTown",
    address: "play.craftyourtown.com",
    description: "Towny and economy server focused on towns, jobs, ranks, and trading.",
    categories: ["towny", "economy", "survival"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "FadeCloud",
    address: "fadecloud.com",
    description: "Network with skyblock, prison, survival, and custom seasonal content.",
    categories: ["skyblock", "prison", "survival"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "LoverFella",
    address: "play.loverfella.com",
    description: "Creator network with survival, economy, events, and community gameplay.",
    categories: ["survival", "economy", "community"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "LemonCloud",
    address: "play.lemoncloud.org",
    description: "Network with survival, prison, skyblock, and economy game modes.",
    categories: ["survival", "prison", "skyblock"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "AkumaMC",
    address: "akumamc.net",
    description: "Prison network with fast progression, gangs, ranks, and seasonal resets.",
    categories: ["prison", "pvp", "economy"],
    versions: ["1.8", "1.20", "1.21"]
  },
  {
    title: "Vortex Network",
    address: "mc.vortexnetwork.net",
    description: "Space-themed network with prison, skyblock, survival, and Pixelmon.",
    categories: ["prison", "skyblock", "pixelmon"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "Advancius Network",
    address: "mc.advancius.net",
    description: "Family-friendly network with survival, skyblock, quests, and minigames.",
    categories: ["survival", "skyblock", "minigames"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "InsanityCraft",
    address: "play.insanitycraft.net",
    description: "Network with survival, skyblock, factions, prison, and custom content.",
    categories: ["survival", "skyblock", "factions"],
    versions: ["1.20", "1.21"]
  },
  {
    title: "JartexNetwork",
    address: "play.jartexnetwork.com",
    description: "Offline-mode friendly network with BedWars, SkyWars, factions, and survival.",
    categories: ["offline-mode", "minigames", "survival"],
    versions: ["1.8", "1.20", "1.21"]
  },
  {
    title: "Herobrine.org",
    address: "herobrine.org",
    description: "Offline-mode friendly network with survival, skyblock, BedWars, and PvP.",
    categories: ["offline-mode", "survival", "minigames"],
    versions: ["1.8", "1.20", "1.21"]
  }
];

let serverDirectoryCache = {
  fetchedAt: 0,
  servers: []
};

function stripMinecraftFormatting(value) {
  return String(value || "").replace(/(?:§|Â§)[0-9a-fk-or]/gi, "").replace(/\s+/g, " ").trim();
}

function normalizeServerDirectoryEntry(raw) {
  const host = String(raw.hostname || raw.ipAddress || raw.address || raw.ip || raw.host || raw.slug || "").trim();
  const port = Number(raw.port || 25565);
  const address = host && port && port !== 25565 ? `${host}:${port}` : host;
  if (!address) return null;
  const motd = stripMinecraftFormatting(raw.motd || raw.description || "");
  const name = String(raw.name || raw.title || motd.split("\\n")[0] || address).trim();
  const players = Number(raw.players ?? raw.playerCount ?? raw.onlinePlayers ?? raw.playerStats?.onlinePlayers ?? 0);
  const maxPlayers = Number(raw.maxPlayers ?? raw.max_players ?? raw.playerStats?.maxPlayers ?? 0);
  const status = String(raw.status || (players > 0 ? "online" : "")).trim();
  const platform = String(raw.platform || raw.edition || "java").trim();
  const logo = raw.logo || raw.iconUrl || raw.icon_url || raw.favicon?.icon || `https://api.mcsrvstat.us/icon/${encodeURIComponent(address)}`;
  const versions = Array.isArray(raw.versions) ? raw.versions : [raw.version].filter(Boolean);
  const categories = [
    status,
    platform,
    raw.software,
    raw.authMode === 0 ? "offline-mode" : raw.authMode === 1 ? "premium" : raw.authMode === 2 ? "whitelisted" : "",
    ...(Array.isArray(raw.categories) ? raw.categories : []),
    ...(Array.isArray(raw.tags) ? raw.tags : [])
  ].filter(Boolean);

  return {
    title: name,
    address,
    description: motd || [
      status ? `Status: ${status}` : "",
      Number.isFinite(players) && players > 0 ? `${players.toLocaleString()} players online` : "",
      Number.isFinite(maxPlayers) && maxPlayers > 0 ? `${maxPlayers.toLocaleString()} max` : ""
    ].filter(Boolean).join(" - ") || "Public Minecraft Java server.",
    categories,
    versions,
    players,
    maxPlayers,
    logo,
    dateModified: raw.timestamp || raw.updatedAt || ""
  };
}

async function searchServerDirectory({ query = "", offset = 0 }) {
  const search = String(query || "").trim();
  const limit = 20;
  const start = Number(offset || 0);
  const cacheKey = `${search.toLowerCase()}::${start}`;
  if (serverDirectoryCache[cacheKey] && Date.now() - serverDirectoryCache[cacheKey].fetchedAt < 5 * 60 * 1000) {
    return serverDirectoryCache[cacheKey].result;
  }

  const curatedMatches = searchCuratedServers(search);
  if (!search || curatedMatches.length) {
    const result = serverSearchResult(curatedMatches, start, limit);
    serverDirectoryCache[cacheKey] = { fetchedAt: Date.now(), result };
    return result;
  }

  try {
    const page = Math.floor(start / limit) + 1;
    const params = new URLSearchParams({
      edition: "Java",
      sort: "player",
      live: "true",
      page: String(page)
    });
    if (search) params.set("query", search);
    const response = await fetch(`https://api.mcscans.fi/public/v1/servers?${params}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "DreameLauncher/0.1.0"
      }
    });
    if (!response.ok) throw new Error(`Server list request failed ${response.status}.`);
    const data = await response.json();
    const servers = (data.servers || data.data || [])
      .map(normalizeServerDirectoryEntry)
      .filter((server) => server && isReadableServerResult(server));
    const result = {
      type: "servers",
      offset: start,
      limit,
      totalHits: servers.length,
      hits: servers.slice(0, limit).map(serverToExploreHit)
    };
    serverDirectoryCache[cacheKey] = { fetchedAt: Date.now(), result };
    return result;
  } catch {
    // Keep the built-in list available when the public directory is unreachable.
  }

  const result = serverSearchResult(serverDirectory, start, limit);
  serverDirectoryCache[cacheKey] = { fetchedAt: Date.now(), result };
  return result;
}

function searchCuratedServers(query = "") {
  const fallbackServers = serverDirectory.map((server) => ({
    ...server,
    logo: `https://api.mcsrvstat.us/icon/${encodeURIComponent(server.address)}`
  }));
  const fallbackSearch = query.trim().toLowerCase();
  return fallbackServers.filter((server) => {
    if (!fallbackSearch) return true;
    return [
      server.title,
      server.address,
      server.description,
      ...(server.categories || []),
      ...(server.versions || [])
    ].join(" ").toLowerCase().includes(fallbackSearch);
  });
}

function serverToExploreHit(server) {
  return {
    projectId: server.address,
    slug: server.address,
    address: server.address,
    title: server.title,
    author: "Minecraft server",
    description: server.description,
    iconUrl: server.logo || `https://api.mcsrvstat.us/icon/${encodeURIComponent(server.address)}`,
    projectType: "server",
    downloads: server.players || 0,
    follows: server.maxPlayers || 0,
    versions: server.versions || [],
    categories: server.categories || [],
    dateModified: ""
  };
}

function serverSearchResult(servers, start, limit) {
  return {
    type: "servers",
    offset: start,
    limit,
    totalHits: servers.length,
    hits: servers.slice(start, start + limit).map(serverToExploreHit)
  };
}

function isReadableServerResult(server) {
  const address = String(server.address || "");
  const text = `${server.title || ""} ${server.description || ""} ${address}`;
  if (/^\d{1,3}(?:\.\d{1,3}){3}(?::\d+)?$/.test(address)) return false;
  if (/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af\u0400-\u04ff]/u.test(text)) return false;
  if ((server.categories || []).some((category) => String(category).toLowerCase() === "whitelisted")) return false;
  return Boolean(server.title && server.address);
}

async function modrinthGetJson(route) {
  const response = await fetch(`https://api.modrinth.com/v2/${route}`, {
    headers: { "User-Agent": "DreameLauncher/0.1.0" }
  });
  if (!response.ok) throw new Error(`Modrinth request failed ${response.status}.`);
  return response.json();
}

async function searchModrinth({ type = "modpacks", query = "", offset = 0 }) {
  if (type === "servers") {
    return searchServerDirectory({ query, offset });
  }

  const projectType = modrinthProjectType(type);
  const params = new URLSearchParams({
    query: String(query || ""),
    limit: "20",
    offset: String(offset || 0),
    index: "relevance"
  });
  params.set("facets", JSON.stringify([[`project_type:${projectType}`]]));

  const data = await modrinthGetJson(`search?${params}`);
  return {
    type,
    offset: data.offset || 0,
    limit: data.limit || 20,
    totalHits: data.total_hits || 0,
    hits: (data.hits || []).map((hit) => ({
      projectId: hit.project_id,
      slug: hit.slug,
      title: hit.title,
      author: hit.author,
      description: hit.description,
      iconUrl: hit.icon_url,
      projectType: hit.project_type,
      downloads: hit.downloads || 0,
      follows: hit.follows || 0,
      versions: hit.versions || [],
      categories: hit.categories || [],
      dateModified: hit.date_modified
    }))
  };
}

async function getModrinthVersions(projectId) {
  const versions = await modrinthGetJson(`project/${encodeURIComponent(projectId)}/version`);
  return versions.map((version) => ({
    id: version.id,
    name: version.name,
    versionNumber: version.version_number,
    gameVersions: version.game_versions || [],
    loaders: version.loaders || [],
    versionType: version.version_type,
    datePublished: version.date_published,
    files: (version.files || []).map((file) => ({
      url: file.url,
      filename: file.filename,
      primary: Boolean(file.primary),
      size: file.size
    })),
    dependencies: version.dependencies || [],
    projectId: version.project_id
  }));
}

async function getModrinthVersion(versionId) {
  return modrinthGetJson(`version/${encodeURIComponent(versionId)}`);
}

function getPrimaryModrinthFile(version) {
  const files = Array.isArray(version.files) ? version.files : [];
  return files.find((file) => file.primary) || files[0];
}

function modrinthVersionMatchesInstance(version, instance, projectType) {
  const gameVersions = version.game_versions || version.gameVersions || [];
  const loaders = (version.loaders || []).map((loader) => String(loader).toLowerCase());
  const gameMatches = gameVersions.length === 0 || gameVersions.includes(instance.gameVersion);
  if (!gameMatches) return false;

  if (["resourcepack", "datapack", "shader"].includes(projectType)) return true;
  if (loaders.length === 0) return true;

  const loader = String(instance.loader || "vanilla").toLowerCase();
  return loaders.includes(loader) || loaders.includes("minecraft");
}

async function chooseCompatibleModrinthVersion(projectId, instance, projectType) {
  if (!projectId) throw new Error("Missing Modrinth project id.");
  const versions = await modrinthGetJson(`project/${encodeURIComponent(projectId)}/version`);
  const compatible = versions.find((version) => modrinthVersionMatchesInstance(version, instance, projectType));
  if (!compatible) {
    throw new Error(`No compatible ${projectType} version found for ${instance.name} (${instance.loader} ${instance.gameVersion}).`);
  }
  return compatible;
}

async function installModrinthFile({ instanceId, versionId, projectId, projectType }, sender = null) {
  const instance = getInstance(instanceId);
  const updateProgress = createInstallProgress(sender);
  const normalizedProjectType = projectType || "mod";
  updateProgress(5, "Finding compatible version");
  const version = versionId
    ? await getModrinthVersion(versionId)
    : await chooseCompatibleModrinthVersion(projectId, instance, normalizedProjectType);
  const file = getPrimaryModrinthFile(version);
  if (!file?.url || !file?.filename) throw new Error("This Modrinth version has no downloadable file.");

  const folder = modrinthInstallFolder(normalizedProjectType || version.project_type);
  const destination = assertInsideInstance(instance, path.join(instance.path, folder, file.filename));
  const expected = {
    sha1: file.hashes?.sha1,
    size: file.size
  };
  if (fileMatchesExpected(destination, expected)) {
    updateProgress(100, "Already installed");
    return {
      instance,
      folder,
      fileName: file.filename,
      path: destination,
      versionId: version.id,
      versionNumber: version.version_number,
      alreadyInstalled: true
    };
  }

  await downloadFile(file.url, destination, instance, file.filename, scaleProgress(updateProgress, 15, 95, "Downloading file"), expected);
  updateProgress(100, "Done");
  return {
    instance,
    folder,
    fileName: file.filename,
    path: destination,
    versionId: version.id,
    versionNumber: version.version_number
  };
}

function copyExtractedOverrides(root, instancePath) {
  for (const folderName of ["overrides", "client-overrides"]) {
    const source = path.join(root, folderName);
    if (fs.existsSync(source)) {
      fs.cpSync(source, instancePath, { recursive: true, force: true });
    }
  }
}

function saveModrinthPackIconFromZip(zip) {
  const entry = findZipEntry(zip, [
    "icon.png",
    "icon.jpg",
    "icon.jpeg",
    "icon.webp",
    "pack.png",
    "logo.png"
  ]);
  const mime = getMimeType(entry?.name || "");
  if (!entry || !mime) return "";

  const data = readZipEntry(zip, entry);
  if (!data) return "";

  const iconsDir = path.join(appDataRoot, "assets", "icons");
  fs.mkdirSync(iconsDir, { recursive: true });
  const destination = path.join(iconsDir, `${crypto.randomUUID()}${path.extname(entry.name).toLowerCase()}`);
  fs.writeFileSync(destination, data);
  return destination;
}

async function saveModrinthProjectIcon(projectId) {
  if (!projectId) return "";

  try {
    const project = await modrinthGetJson(`project/${encodeURIComponent(projectId)}`);
    if (!project.icon_url) return "";

    const pathname = new URL(project.icon_url).pathname;
    const ext = path.extname(pathname).toLowerCase() || ".png";
    const iconsDir = path.join(appDataRoot, "assets", "icons");
    const destination = path.join(iconsDir, `${crypto.randomUUID()}${ext}`);
    await downloadFile(project.icon_url, destination, null, "Modrinth project icon");
    return destination;
  } catch {
    return "";
  }
}

async function installModrinthPack(versionId, sender = null) {
  const updateProgress = createInstallProgress(sender);
  updateProgress(5, "Loading modpack version");
  const version = await getModrinthVersion(versionId);
  const existingPack = readInstances().instances.find((instance) => instance.modrinthVersionId === version.id);
  if (existingPack) {
    updateProgress(100, "Already installed");
    return { ...existingPack, alreadyInstalled: true };
  }

  const file = getPrimaryModrinthFile(version);
  if (!file?.url || !file?.filename) throw new Error("This modpack version has no .mrpack file.");

  const tempRoot = path.join(appDataRoot, "cache", "modrinth", version.id);
  const packPath = path.join(tempRoot, file.filename);
  fs.rmSync(tempRoot, { recursive: true, force: true });
  fs.mkdirSync(tempRoot, { recursive: true });

  await downloadFile(file.url, packPath, null, file.filename, scaleProgress(updateProgress, 8, 25, "Downloading modpack"), {
    sha1: file.hashes?.sha1,
    size: file.size
  });
  updateProgress(28, "Reading modpack");
  const zip = readZipEntries(packPath);
  const manifestEntry = findZipEntry(zip, ["modrinth.index.json"]);
  const manifestBuffer = manifestEntry ? readZipEntry(zip, manifestEntry) : null;
  if (!manifestBuffer) throw new Error("This .mrpack is missing modrinth.index.json.");

  const manifest = JSON.parse(manifestBuffer.toString("utf8"));
  const dependencies = manifest.dependencies || {};
  const iconPath = saveModrinthPackIconFromZip(zip) || await saveModrinthProjectIcon(version.project_id);
  const instance = upsertInstance({
    name: manifest.name || version.name,
    iconPath,
    modrinthProjectId: version.project_id,
    modrinthVersionId: version.id,
    modrinthFileName: file.filename,
    loader: dependencies["fabric-loader"] ? "fabric"
      : dependencies["quilt-loader"] ? "quilt"
      : dependencies["neoforge"] ? "neoforge"
      : dependencies["forge"] ? "forge"
      : "vanilla",
    gameVersion: dependencies.minecraft || version.game_versions?.[0] || "latest-release",
    loaderVersionType: "other",
    loaderVersion: dependencies["fabric-loader"] || dependencies["quilt-loader"] || dependencies.neoforge || dependencies.forge || "",
    javaVersion: 21,
    ramMb: 4096,
    resolution: "854x480"
  });

  copyExtractedOverridesFromZip(zip, instance.path);

  const files = Array.isArray(manifest.files) ? manifest.files : [];
  for (const packFile of files) {
    if (packFile.env?.client === "unsupported") continue;
    const url = packFile.downloads?.[0];
    if (!url || !packFile.path) continue;
    const destination = assertInsideInstance(instance, path.join(instance.path, packFile.path));
    const fileIndex = files.indexOf(packFile);
    await downloadFile(url, destination, instance, path.basename(packFile.path), null, {
      sha1: packFile.hashes?.sha1,
      size: packFile.fileSize || packFile.size
    });
    updateProgress(35 + ((fileIndex + 1) / Math.max(files.length, 1)) * 60, `Installing files ${fileIndex + 1}/${files.length}`);
  }

  updateProgress(100, "Done");
  return instance;
}

function copyExtractedOverridesFromZip(zip, instancePath) {
  const overridePrefixes = ["overrides/", "client-overrides/"];
  for (const entry of zip.entries) {
    const prefix = overridePrefixes.find((item) => entry.name.startsWith(item));
    if (!prefix || entry.name.endsWith("/")) continue;
    const relative = entry.name.slice(prefix.length);
    if (!relative) continue;
    const destination = assertInsideInstance({ path: instancePath }, path.join(instancePath, relative));
    const data = readZipEntry(zip, entry, 0);
    if (!data) continue;
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, data);
  }
}

async function launchServerWithInstance({ instanceId, address, title, iconUrl, description }, sender = null) {
  const instance = getInstance(instanceId);
  const cleanAddress = String(address || "").trim();
  if (!cleanAddress) throw new Error("Server address is required.");
  instance.extraJvmArgs = instance.extraJvmArgs || "";
  instance.quickPlayServer = cleanAddress;
  const launch = await launchInstance(instance.id, { serverAddress: cleanAddress }, sender);
  const recentServers = rememberRecentServer({
    instanceId: instance.id,
    address: cleanAddress,
    title: String(title || cleanAddress).trim(),
    iconUrl: String(iconUrl || "").trim(),
    description: String(description || "").trim()
  });
  return { ...launch, recentServers: readRecentServersForRenderer() };
}

function upsertAccount(account) {
  const current = readAccounts().accounts;
  const existingIndex = current.findIndex((item) => item.id === account.id);
  const next = existingIndex >= 0
    ? current.map((item) => (item.id === account.id ? { ...item, ...account } : item))
    : [...current, account];

  writeAccounts(next);
  writeSettings({ activeAccountId: account.id, playerName: account.name });
  return account;
}

function persistVerifiedAccount(account, previousId) {
  const current = readAccounts().accounts;
  const next = [];
  let replaced = false;

  for (const item of current) {
    if (item.id === previousId || item.id === account.id) {
      if (!replaced) {
        next.push({ ...item, ...account });
        replaced = true;
      }
      continue;
    }

    next.push(item);
  }

  if (!replaced) next.push(account);
  writeAccounts(next);

  const settings = readSettings();
  if (settings.activeAccountId === previousId || settings.activeAccountId === account.id) {
    writeSettings({ activeAccountId: account.id, playerName: account.name });
  }
}

function selectAccount(accountId) {
  const account = readAccounts().accounts.find((item) => item.id === accountId);
  if (!account) {
    throw new Error("Account not found.");
  }

  writeSettings({ activeAccountId: account.id, playerName: account.name });
  return account;
}

function removeAccount(accountId) {
  const accounts = readAccounts().accounts;
  const next = accounts.filter((item) => item.id !== accountId);
  const settings = readSettings();
  writeAccounts(next);

  if (settings.activeAccountId === accountId) {
    const nextActive = next[0] || null;
    writeSettings({
      activeAccountId: nextActive?.id || null,
      playerName: nextActive?.name || "Login first"
    });
  }

  return {
    accounts: readAccounts().accounts,
    settings: readSettings()
  };
}

function createOfflineId(name) {
  const hash = crypto.createHash("md5").update(`OfflinePlayer:${name}`).digest("hex");
  return `${hash.slice(0, 8)}-${hash.slice(8, 12)}-${hash.slice(12, 16)}-${hash.slice(16, 20)}-${hash.slice(20)}`;
}

function createOfflineAccount(name) {
  const uuid = createOfflineId(name);

  return {
    id: uuid,
    type: "offline",
    name,
    uuid,
    accessToken: "0",
    userType: "legacy",
    canJoinPremiumServers: false,
    canUseOfficialSkins: false,
    allowedUse: "Singleplayer, LAN, development, and servers configured for offline-mode accounts.",
    addedAt: new Date().toISOString()
  };
}

async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    const error = new Error(`${response.status} ${response.statusText}: ${text}`);
    error.status = response.status;
    error.body = text;
    throw error;
  }

  return response.json();
}

async function getJson(url, headers) {
  const response = await fetch(url, { headers });

  if (!response.ok) {
    const text = await response.text();
    const error = new Error(`${response.status} ${response.statusText}: ${text}`);
    error.status = response.status;
    error.body = text;
    throw error;
  }

  return response.json();
}

async function pollMicrosoftToken({ clientId, deviceCode, interval, tokenEndpoint, scope }) {
  const params = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:device_code",
    client_id: clientId,
    device_code: deviceCode
  });

  if (scope) {
    params.set("scope", scope);
  }

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, interval * 1000));

    const response = await fetch(tokenEndpoint || "https://login.live.com/oauth20_token.srf", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });

    const data = await response.json();
    if (response.ok) return data;
    if (data.error === "authorization_pending") continue;
    if (data.error === "slow_down") interval += 5;
    else throw new Error(data.error_description || data.error || "Microsoft login failed.");
  }
}

async function authenticateXboxLive(msAccessToken, tokenPrefix) {
  return postJson("https://user.auth.xboxlive.com/user/authenticate", {
    Properties: {
      AuthMethod: "RPS",
      SiteName: "user.auth.xboxlive.com",
      RpsTicket: `${tokenPrefix || ""}${msAccessToken}`
    },
    RelyingParty: "http://auth.xboxlive.com",
    TokenType: "JWT"
  });
}

async function completeMinecraftLogin(msAccessToken, tokenPrefix, authSession = {}) {
  let xboxLive;
  try {
    xboxLive = await authenticateXboxLive(msAccessToken, tokenPrefix);
  } catch (error) {
    if (!tokenPrefix) {
      xboxLive = await authenticateXboxLive(msAccessToken, "d=");
    } else {
      throw error;
    }
  }

  const xsts = await postJson("https://xsts.auth.xboxlive.com/xsts/authorize", {
    Properties: {
      SandboxId: "RETAIL",
      UserTokens: [xboxLive.Token]
    },
    RelyingParty: "rp://api.minecraftservices.com/",
    TokenType: "JWT"
  });

  const userHash = xsts.DisplayClaims.xui[0].uhs;
  const mcAuth = await postJson("https://api.minecraftservices.com/authentication/login_with_xbox", {
    identityToken: `XBL3.0 x=${userHash};${xsts.Token}`
  });

  let profile;
  try {
    profile = await getJson("https://api.minecraftservices.com/minecraft/profile", {
      Authorization: `Bearer ${mcAuth.access_token}`
    });
  } catch (error) {
    if (error.status === 404) {
      throw new Error("This Microsoft account does not have a Minecraft Java profile. Buy Minecraft Java Edition first, then try again.");
    }

    throw error;
  }

  return {
    id: profile.id,
    type: "microsoft",
    name: profile.name,
    xuid: userHash,
    minecraftAccessToken: mcAuth.access_token,
    microsoftAccessToken: msAccessToken,
    microsoftRefreshToken: authSession.refreshToken || undefined,
    microsoftTokenEndpoint: authSession.tokenEndpoint || undefined,
    microsoftTokenScope: authSession.scope || undefined,
    microsoftTokenPrefix: tokenPrefix || "",
    clientId: authSession.clientId || bundledMicrosoftClientId,
    addedAt: new Date().toISOString()
  };
}

function microsoftReloginError() {
  const error = new Error("Your Minecraft session expired. Sign in with Microsoft again to refresh it.");
  error.code = "MICROSOFT_RELOGIN_REQUIRED";
  return error;
}

async function refreshMicrosoftAccountSession(account) {
  if (account.type === "microsoft-xal") {
    return refreshXalAccountSession(account);
  }

  if (account.type !== "microsoft" || !account.microsoftRefreshToken) {
    throw microsoftReloginError();
  }

  const tokenEndpoint = account.microsoftTokenEndpoint || "https://login.live.com/oauth20_token.srf";
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: account.clientId || bundledMicrosoftClientId,
    refresh_token: account.microsoftRefreshToken
  });
  if (account.microsoftTokenScope) params.set("scope", account.microsoftTokenScope);

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });
  const token = await response.json().catch(() => ({}));
  if (!response.ok || !token.access_token) throw microsoftReloginError();

  const refreshed = await completeMinecraftLogin(
    token.access_token,
    account.microsoftTokenPrefix || "",
    {
      clientId: account.clientId,
      refreshToken: token.refresh_token || account.microsoftRefreshToken,
      tokenEndpoint,
      scope: account.microsoftTokenScope
    }
  );
  const next = { ...account, ...refreshed, addedAt: account.addedAt };
  persistVerifiedAccount(next, account.id);
  return next;
}

async function refreshXalAccountSession(account) {
  try {
    const { xal, tokenStore } = await createXalContext();
    const webToken = await xal.getWebToken();
    saveXalStore(tokenStore);
    const refreshed = await minecraftLoginWithXalToken(webToken);
    const next = { ...account, ...refreshed, addedAt: account.addedAt };
    persistVerifiedAccount(next, account.id);
    return next;
  } catch {
    throw microsoftReloginError();
  }
}

async function ensureFreshMinecraftAccount(account) {
  try {
    await getJson("https://api.minecraftservices.com/minecraft/profile", {
      Authorization: `Bearer ${account.minecraftAccessToken}`
    });
    return account;
  } catch (error) {
    if (error.status !== 401) throw error;
    return refreshMicrosoftAccountSession(account);
  }
}

async function loadXalNode() {
  try {
    return await import("xal-node");
  } catch (error) {
    throw new Error("XAL/Sisu login needs xal-node installed. Run: npm.cmd install");
  }
}

async function createXalContext() {
  const { Xal, TokenStore } = await loadXalNode();
  const tokenStore = new TokenStore();

  if (fs.existsSync(xalTokensPath)) {
    tokenStore.load(xalTokensPath);
  }

  const xal = new Xal(tokenStore);
  return { xal, tokenStore };
}

function saveXalStore(tokenStore) {
  if (typeof tokenStore.save === "function") {
    tokenStore.save(xalTokensPath);
  }
}

function normalizeXalRedirect(redirect) {
  if (typeof redirect === "string") return redirect;
  if (redirect instanceof URL) return redirect.toString();
  if (redirect?.url) return String(redirect.url);
  if (redirect?.redirect) return String(redirect.redirect);
  if (redirect?.redirectUri) return String(redirect.redirectUri);
  if (redirect?.uri) return String(redirect.uri);
  if (redirect?.sisuAuth?.MsaOauthRedirect) return String(redirect.sisuAuth.MsaOauthRedirect);

  throw new Error(`XAL returned an unsupported redirect value: ${JSON.stringify(redirect)}`);
}

async function minecraftLoginWithXalToken(webToken) {
  const token = webToken?.Token || webToken?.token || webToken?.data?.Token || webToken?.data?.token;
  const userHash = webToken?.DisplayClaims?.xui?.[0]?.uhs
    || webToken?.displayClaims?.xui?.[0]?.uhs
    || webToken?.data?.DisplayClaims?.xui?.[0]?.uhs
    || webToken?.data?.displayClaims?.xui?.[0]?.uhs;

  if (!token || !userHash) {
    throw new Error("XAL login succeeded, but Dreame could not read the Xbox web token shape.");
  }

  const mcAuth = await postJson("https://api.minecraftservices.com/authentication/login_with_xbox", {
    identityToken: `XBL3.0 x=${userHash};${token}`
  });

  let profile;
  try {
    profile = await getJson("https://api.minecraftservices.com/minecraft/profile", {
      Authorization: `Bearer ${mcAuth.access_token}`
    });
  } catch (error) {
    if (error.status === 404) {
      throw new Error("This Microsoft account does not have a Minecraft Java profile. Buy Minecraft Java Edition first, then try again.");
    }

    throw error;
  }

  return {
    id: profile.id,
    type: "microsoft-xal",
    name: profile.name,
    xuid: userHash,
    minecraftAccessToken: mcAuth.access_token,
    clientId: "xal",
    addedAt: new Date().toISOString()
  };
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 760,
    minWidth: 960,
    minHeight: 620,
    title: "Dreame Launcher",
    backgroundColor: "#0b0d12",
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: transparentTitleBarColor,
      symbolColor: "#f6f7fb",
      height: 52
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

function quitIfNoWindowsAndNoMinecraft() {
  if (process.platform === "darwin") return;
  if (BrowserWindow.getAllWindows().length === 0 && runningProcesses.size === 0) {
    app.quit();
  }
}

app.setPath("userData", appDataRoot);

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  ensureLauncherData();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  quitIfNoWindowsAndNoMinecraft();
});

ipcMain.handle("launcher:get-state", () => ({
  dataPath: appDataRoot,
  settings: readSettings(),
  accounts: readAccounts().accounts,
  skins: readSkinsForRenderer(),
  instances: readInstances().instances,
  recentServers: readRecentServersForRenderer()
}));

ipcMain.handle("servers:recent", () => readRecentServersForRenderer());

ipcMain.handle("launcher:save-settings", (_event, settings) => writeSettings(settings));

ipcMain.handle("launcher:set-titlebar-color", (_event, color) => {
  applyTitleBarColor(color);
  return true;
});

ipcMain.handle("launcher:open-data-folder", async () => {
  ensureLauncherData();
  await shell.openPath(appDataRoot);
  return appDataRoot;
});

ipcMain.handle("launcher:copy-text", (_event, text) => {
  clipboard.writeText(String(text || ""));
  return true;
});

ipcMain.handle("instances:list", () => readInstances().instances);

ipcMain.handle("instances:save", (event, instance) => {
  if (instance?.skipPrepare) return upsertInstance(instance);
  return upsertInstanceWithPreparation(instance, event.sender);
});

ipcMain.handle("instances:remove", (_event, instanceId) => removeInstance(instanceId));

ipcMain.handle("instances:open-folder", async (_event, instanceId, subfolder) => {
  const instance = readInstances().instances.find((item) => item.id === instanceId);
  if (!instance) throw new Error("Instance not found.");

  const target = subfolder ? path.join(instance.path, subfolder) : instance.path;
  fs.mkdirSync(target, { recursive: true });
  await shell.openPath(target);
  return target;
});

ipcMain.handle("instances:choose-icon", async () => {
  const result = await dialog.showOpenDialog({
    title: "Select instance icon",
    properties: ["openFile"],
    filters: [
      { name: "Images and icons", extensions: ["png", "jpg", "jpeg", "webp", "gif", "ico", "bmp", "svg"] },
      { name: "All files", extensions: ["*"] }
    ]
  });

  if (result.canceled || result.filePaths.length === 0) return "";

  const source = result.filePaths[0];
  const iconsDir = path.join(appDataRoot, "assets", "icons");
  fs.mkdirSync(iconsDir, { recursive: true });
  const destination = path.join(iconsDir, `${crypto.randomUUID()}${path.extname(source)}`);
  fs.copyFileSync(source, destination);
  return destination;
});

ipcMain.handle("instances:choose-java", async () => {
  const result = await dialog.showOpenDialog({
    title: "Select Java executable",
    properties: ["openFile"],
    filters: [
      { name: "Java executable", extensions: ["exe"] },
      { name: "All files", extensions: ["*"] }
    ]
  });

  return result.canceled ? "" : result.filePaths[0];
});

ipcMain.handle("instances:import-files", (_event, instanceId, filePaths, targetFolder) => {
  return filePaths.map((filePath) => copyFileIntoInstance(instanceId, filePath, guessContentFolder(filePath, targetFolder)));
});

ipcMain.handle("instances:list-files", (_event, instanceId, folder) => listFolderEntries(instanceId, folder));

ipcMain.handle("instances:delete-file", (_event, instanceId, folder, fileName) => {
  return removeInstanceEntry(instanceId, folder, fileName);
});

ipcMain.handle("instances:toggle-file", (_event, instanceId, folder, fileName, enabled) => {
  return toggleInstanceEntry(instanceId, folder, fileName, enabled);
});

ipcMain.handle("instances:choose-import-files", async (_event, instanceId, targetFolder) => {
  const result = await dialog.showOpenDialog({
    title: "Upload files or folders",
    properties: ["openFile", "openDirectory", "multiSelections"]
  });

  if (result.canceled) return [];
  return result.filePaths.map((filePath) => copyFileIntoInstance(instanceId, filePath, guessContentFolder(filePath, targetFolder)));
});

ipcMain.handle("minecraft:list-versions", async () => {
  const manifest = await getJson("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json");
  return {
    latest: manifest.latest,
    versions: manifest.versions.map((version) => ({
      id: version.id,
      type: version.type,
      releaseTime: version.releaseTime
    }))
  };
});

function instanceDebugPath(instance) {
  const debugDir = path.join(instance.path, "debug");
  fs.mkdirSync(debugDir, { recursive: true });
  return path.join(debugDir, "latest.log");
}

function writeDebug(instance, message, reset = false) {
  if (!instance) return;
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.writeFileSync(instanceDebugPath(instance), line, { flag: reset ? "w" : "a" });
}

function createLaunchProgress(sender, instance) {
  let current = 0;
  return (percent, message) => {
    if (!sender || sender.isDestroyed?.()) return;
    current = Math.max(current, Math.min(100, Math.round(percent)));
    sender.send("instances:launch-progress", {
      instanceId: instance.id,
      percent: current,
      message
    });
  };
}

function createInstanceProgress(sender, instance) {
  let current = 0;
  return (percent, message) => {
    if (!sender || sender.isDestroyed?.()) return;
    current = Math.max(current, Math.min(100, Math.round(percent)));
    sender.send("instances:create-progress", {
      instanceId: instance.id,
      percent: current,
      message
    });
  };
}

function createInstallProgress(sender) {
  let current = 0;
  return (percent, message) => {
    if (!sender || sender.isDestroyed?.()) return;
    current = Math.max(current, Math.min(100, Math.round(percent)));
    sender.send("modrinth:install-progress", {
      percent: current,
      message
    });
  };
}

function scaleProgress(updateProgress, start, end, message) {
  return (percent, nextMessage) => {
    if (!updateProgress) return;
    const value = start + ((end - start) * Math.max(0, Math.min(100, percent)) / 100);
    updateProgress(value, nextMessage || message);
  };
}

function fileMatchesExpected(filePath, expected = {}) {
  if (!fs.existsSync(filePath)) return false;
  const stat = fs.statSync(filePath);
  if (expected.size && stat.size !== Number(expected.size)) return false;
  if (expected.sha1) {
    const hash = crypto.createHash("sha1").update(fs.readFileSync(filePath)).digest("hex");
    if (hash.toLowerCase() !== String(expected.sha1).toLowerCase()) return false;
  }
  return true;
}

async function downloadFile(url, destination, instance, label, onProgress, expected = {}) {
  if (fileMatchesExpected(destination, expected)) {
    writeDebug(instance, `Using cached ${label || path.basename(destination)}`);
    if (onProgress) onProgress(100, `Using cached ${label || path.basename(destination)}`);
    return destination;
  }
  if (fs.existsSync(destination)) {
    writeDebug(instance, `Cached ${label || path.basename(destination)} is incomplete or invalid. Redownloading.`);
    fs.rmSync(destination, { force: true });
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  writeDebug(instance, `Downloading ${label || path.basename(destination)} from ${url}`);
  if (onProgress) onProgress(0, `Downloading ${label || path.basename(destination)}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed ${response.status}: ${url}`);

  let buffer;
  const total = Number(response.headers.get("content-length") || 0);
  if (response.body?.getReader && total > 0) {
    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(Buffer.from(value));
      received += value.length;
      if (onProgress) onProgress((received / total) * 100, `Downloading ${label || path.basename(destination)}`);
    }
    buffer = Buffer.concat(chunks);
  } else {
    buffer = Buffer.from(await response.arrayBuffer());
  }

  fs.writeFileSync(destination, buffer);
  if (!fileMatchesExpected(destination, expected)) {
    fs.rmSync(destination, { force: true });
    throw new Error(`Downloaded ${label || path.basename(destination)} did not pass verification.`);
  }
  if (onProgress) onProgress(100, `Downloaded ${label || path.basename(destination)}`);
  return destination;
}

function libraryPathFromName(name) {
  const [group, artifact, version] = name.split(":");
  return path.join(...group.split("."), artifact, version, `${artifact}-${version}.jar`);
}

function mavenUrlFromName(baseUrl, name) {
  return `${baseUrl.replace(/\/?$/, "/")}${libraryPathFromName(name).replaceAll("\\", "/")}`;
}

function featureRulesMatch(features = {}, context = {}) {
  return Object.entries(features).every(([key, expected]) => context.features?.[key] === expected);
}

function libraryAllowed(library, context = {}) {
  if (!library.rules) return true;
  let allowed = false;
  for (const rule of library.rules) {
    const applies = (!rule.os || rule.os.name === "windows")
      && (!rule.features || featureRulesMatch(rule.features, context));
    if (applies) allowed = rule.action === "allow";
  }
  return allowed;
}

function getArgumentList(args, context) {
  if (!args) return [];
  if (Array.isArray(args)) {
    const output = [];
    for (const item of args) {
      if (typeof item === "string") output.push(item);
      else if (item?.value && (!item.rules || libraryAllowed(item, context))) {
        output.push(...(Array.isArray(item.value) ? item.value : [item.value]));
      }
    }
    return output.map((arg) => replaceVars(arg, context));
  }
  return String(args).split(" ").filter(Boolean).map((arg) => replaceVars(arg, context));
}

function removeQuickPlayArgs(args) {
  const quickPlayFlags = new Set([
    "--quickPlayPath",
    "--quickPlaySingleplayer",
    "--quickPlayMultiplayer",
    "--quickPlayRealms"
  ]);

  const output = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (quickPlayFlags.has(arg)) {
      index += 1;
      continue;
    }
    output.push(arg);
  }

  return output;
}

function removeDemoArgs(args) {
  return args.filter((arg) => arg !== "--demo");
}

function removeUnsupportedJvmArgs(args, javaMajor) {
  const major = Number(javaMajor || 17);
  return args.filter((arg) => {
    if (arg === "--sun-misc-unsafe-memory-access=allow") return major >= 24;
    return true;
  });
}

function getRequiredJavaMajor(profile, instance) {
  const profileMajor = Number(profile?.javaVersion?.majorVersion || 0);
  const instanceMajor = Number(instance?.javaVersion || 0);
  return Math.max(profileMajor || 17, instanceMajor || 17);
}

function normalizeLaunchUuid(uuid) {
  return String(uuid || "").replaceAll("-", "");
}

function redactLaunchArgs(args) {
  const redactedValueFlags = new Set([
    "--accessToken",
    "--auth_access_token",
    "--authSession",
    "--auth_session",
    "--clientToken"
  ]);

  return args.map((arg, index) => {
    if (index > 0 && redactedValueFlags.has(args[index - 1])) return "<redacted>";
    if (/^[A-Za-z0-9._-]{80,}$/.test(arg)) return "<redacted>";
    return arg;
  });
}

function replaceVars(value, context) {
  return String(value).replace(/\$\{([^}]+)\}/g, (_match, key) => context[key] ?? "");
}

async function readJsonFileOrDownload(url, destination, instance, label, onProgress) {
  await downloadFile(url, destination, instance, label, onProgress);
  return JSON.parse(fs.readFileSync(destination, "utf8"));
}

async function getBaseVersionProfile(versionId, instance) {
  const manifest = await getJson("https://piston-meta.mojang.com/mc/game/version_manifest_v2.json");
  const resolvedId = versionId === "latest-release" ? manifest.latest.release
    : versionId === "latest-snapshot" ? manifest.latest.snapshot
    : versionId;
  const version = manifest.versions.find((item) => item.id === resolvedId);
  if (!version) throw new Error(`Minecraft version not found: ${resolvedId}`);

  const jsonPath = path.join(appDataRoot, "versions", resolvedId, `${resolvedId}.json`);
  const profile = await readJsonFileOrDownload(version.url, jsonPath, instance, `${resolvedId}.json`);
  return { id: resolvedId, profile };
}

async function getFabricProfile(gameVersion, instance) {
  const loaders = await getJson("https://meta.fabricmc.net/v2/versions/loader");
  const stable = loaders.find((loader) => loader.stable) || loaders[0];
  const latest = loaders[0];
  const selectedLoader = instance.loaderVersionType === "latest" ? latest
    : instance.loaderVersionType === "other" && instance.loaderVersion ? { version: instance.loaderVersion }
    : stable;
  const profile = await getJson(`https://meta.fabricmc.net/v2/versions/loader/${gameVersion}/${selectedLoader.version}/profile/json`);
  return profile;
}

async function resolveLaunchProfile(instance, options = {}) {
  const base = await getBaseVersionProfile(instance.gameVersion, instance);
  if (instance.loader === "fabric") {
    writeDebug(instance, "Resolving Fabric loader profile");
    const fabricProfile = await getFabricProfile(base.id, instance);
    return {
      id: base.id,
      profile: {
        ...base.profile,
        ...fabricProfile,
        arguments: {
          game: [
            ...(base.profile.arguments?.game || []),
            ...(fabricProfile.arguments?.game || [])
          ],
          jvm: [
            ...(base.profile.arguments?.jvm || []),
            ...(fabricProfile.arguments?.jvm || [])
          ]
        },
        libraries: [
          ...(base.profile.libraries || []),
          ...(fabricProfile.libraries || [])
        ],
        downloads: base.profile.downloads,
        assetIndex: base.profile.assetIndex,
        assets: base.profile.assets
      }
    };
  }

  if (instance.loader !== "vanilla") {
    if (options.prepareOnly) {
      writeDebug(instance, `${instanceLoaderName(instance.loader)} launch support is not implemented yet. Preparing base Minecraft files only.`);
      return base;
    }
    throw new Error(`${instanceLoaderName(instance.loader)} launching is not implemented yet. Vanilla and Fabric are supported first.`);
  }

  return base;
}

function instanceLoaderName(loader) {
  return {
    vanilla: "Vanilla",
    fabric: "Fabric",
    neoforge: "NeoForge",
    forge: "Forge",
    quilt: "Quilt"
  }[loader] || loader;
}

async function prepareAssets(profile, instance, updateProgress) {
  const assetIndex = profile.assetIndex;
  if (!assetIndex?.url) return;
  const indexPath = path.join(appDataRoot, "assets", "indexes", `${assetIndex.id}.json`);
  const index = await readJsonFileOrDownload(assetIndex.url, indexPath, instance, `assets ${assetIndex.id}`, scaleProgress(updateProgress, 0, 5, "Downloading asset index"));
  const objects = Object.values(index.objects || {});
  for (let itemIndex = 0; itemIndex < objects.length; itemIndex += 1) {
    const object = objects[itemIndex];
    const prefix = object.hash.slice(0, 2);
    const destination = path.join(appDataRoot, "assets", "objects", prefix, object.hash);
    await downloadFile(`https://resources.download.minecraft.net/${prefix}/${object.hash}`, destination, instance, `asset ${object.hash}`, null, {
      sha1: object.hash,
      size: object.size
    });
    if (updateProgress) updateProgress(5 + ((itemIndex + 1) / Math.max(objects.length, 1)) * 95, `Preparing assets ${itemIndex + 1}/${objects.length}`);
  }
}

async function extractNative(zipPath, destination) {
  const extract = require("extract-zip");
  fs.mkdirSync(destination, { recursive: true });
  await extract(zipPath, { dir: destination });
}

async function prepareLibraries(profile, instance, nativeDir, updateProgress) {
  const classpath = [];
  const librariesRoot = path.join(appDataRoot, "libraries");
  const libraries = profile.libraries || [];

  for (let libraryIndex = 0; libraryIndex < libraries.length; libraryIndex += 1) {
    const library = libraries[libraryIndex];
    if (!libraryAllowed(library)) continue;

    const artifact = library.downloads?.artifact;
    if (artifact?.url) {
      const destination = path.join(librariesRoot, artifact.path || libraryPathFromName(library.name));
      await downloadFile(artifact.url, destination, instance, library.name, null, {
        sha1: artifact.sha1,
        size: artifact.size
      });
      classpath.push(destination);
    } else if (library.url && library.name) {
      const relativePath = libraryPathFromName(library.name);
      const destination = path.join(librariesRoot, relativePath);
      await downloadFile(mavenUrlFromName(library.url, library.name), destination, instance, library.name);
      classpath.push(destination);
    }

    const nativeKey = library.natives?.windows?.replace("${arch}", "64");
    const native = nativeKey ? library.downloads?.classifiers?.[nativeKey] : null;
    if (native?.url) {
      const destination = path.join(librariesRoot, native.path || `${libraryPathFromName(library.name)}-${nativeKey}.jar`);
      await downloadFile(native.url, destination, instance, `${library.name} natives`, null, {
        sha1: native.sha1,
        size: native.size
      });
      await extractNative(destination, nativeDir);
    }

    if (updateProgress) updateProgress(((libraryIndex + 1) / Math.max(libraries.length, 1)) * 100, `Preparing libraries ${libraryIndex + 1}/${libraries.length}`);
  }

  return classpath;
}

async function prepareMinecraftFiles(instance, updateProgress) {
  writeDebug(instance, `Preparing Minecraft files for ${instance.name}`, true);
  writeDebug(instance, `Instance path: ${instance.path}`);

  if (updateProgress) updateProgress(5, "Resolving Minecraft version");
  const { id: versionId, profile } = await resolveLaunchProfile(instance, { prepareOnly: true });
  const versionDir = path.join(appDataRoot, "versions", versionId);
  const clientJar = path.join(versionDir, `${versionId}.jar`);
  await downloadFile(profile.downloads.client.url, clientJar, instance, `${versionId} client`, scaleProgress(updateProgress, 10, 28, "Downloading Minecraft client"), {
    sha1: profile.downloads.client.sha1,
    size: profile.downloads.client.size
  });

  await prepareAssets(profile, instance, scaleProgress(updateProgress, 28, 64, "Preparing assets"));

  const nativeDir = path.join(instance.path, "natives", versionId);
  fs.rmSync(nativeDir, { recursive: true, force: true });
  const classpath = await prepareLibraries(profile, instance, nativeDir, scaleProgress(updateProgress, 64, 96, "Preparing libraries"));
  classpath.push(clientJar);
  writeDebug(instance, `Prepared Minecraft ${versionId}. Classpath entries: ${classpath.length}`);
  if (updateProgress) updateProgress(98, "Minecraft files ready");
  return { versionId, profile, clientJar, nativeDir, classpath };
}

function findJavaExecutable(instance, javaMajor) {
  if (instance.javaPath && fs.existsSync(instance.javaPath)) return instance.javaPath;
  const detected = detectJavaInstallations();
  if (detected.length > 0) {
    const requiredMajor = Number(javaMajor || instance.javaVersion || 17);
    const exact = detected.find((item) => item.major === requiredMajor);
    if (exact) return exact.path;

    const compatible = detected.find((item) => item.major > requiredMajor);
    if (compatible) return compatible.path;
  }
  return "java";
}

function findJavaInFolder(root) {
  if (!root || !fs.existsSync(root)) return "";
  const direct = path.join(root, "bin", "java.exe");
  if (fs.existsSync(direct)) return direct;

  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    let entries = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const next = path.join(current, entry.name);
      if (entry.isDirectory()) {
        const java = path.join(next, "bin", "java.exe");
        if (fs.existsSync(java)) return java;
        stack.push(next);
      }
    }
  }

  return "";
}

async function ensurePortableJava(instance, javaMajor, updateProgress) {
  const major = Number(javaMajor || instance.javaVersion || 21);
  const runtimeRoot = path.join(appDataRoot, "runtimes", `java-${major}`);
  const existing = findJavaInFolder(runtimeRoot);
  if (existing) {
    writeDebug(instance, `Using bundled Java ${major}: ${existing}`);
    if (updateProgress) updateProgress(100, `Using bundled Java ${major}`);
    return existing;
  }

  writeDebug(instance, `No local Java found. Installing portable Java ${major}...`);
  if (updateProgress) updateProgress(5, `Finding portable Java ${major}`);
  let assets = await getJson(`https://api.adoptium.net/v3/assets/latest/${major}/hotspot?architecture=x64&image_type=jre&os=windows&vendor=eclipse`);
  let pkg = assets?.[0]?.binary?.package;
  let imageType = "jre";
  if (!pkg?.link) {
    assets = await getJson(`https://api.adoptium.net/v3/assets/latest/${major}/hotspot?architecture=x64&image_type=jdk&os=windows&vendor=eclipse`);
    pkg = assets?.[0]?.binary?.package;
    imageType = "jdk";
  }
  if (!pkg?.link) {
    throw new Error(`Could not find a portable Java ${major} download.`);
  }

  const archive = path.join(appDataRoot, "cache", `temurin-${imageType}-${major}.zip`);
  await downloadFile(pkg.link, archive, instance, `Portable Java ${major}`, scaleProgress(updateProgress, 10, 70, `Downloading portable Java ${major}`));

  const extract = require("extract-zip");
  fs.rmSync(runtimeRoot, { recursive: true, force: true });
  fs.mkdirSync(runtimeRoot, { recursive: true });
  writeDebug(instance, `Extracting portable Java ${major}`);
  if (updateProgress) updateProgress(80, `Extracting portable Java ${major}`);
  await extract(archive, { dir: runtimeRoot });

  const java = findJavaInFolder(runtimeRoot);
  if (!java) {
    throw new Error(`Portable Java ${major} installed, but java.exe was not found.`);
  }

  writeDebug(instance, `Portable Java ready: ${java}`);
  if (updateProgress) updateProgress(100, `Portable Java ${major} ready`);
  return java;
}

function detectJavaInstallations() {
  const roots = [
    process.env.JAVA_HOME,
    path.join(process.env.ProgramFiles || "C:\\Program Files", "Java"),
    path.join(process.env.ProgramFiles || "C:\\Program Files", "Eclipse Adoptium"),
    path.join(process.env.ProgramFiles || "C:\\Program Files", "Microsoft"),
    path.join(process.env.ProgramFiles || "C:\\Program Files", "BellSoft"),
    path.join(process.env.ProgramFiles || "C:\\Program Files", "Zulu"),
    path.join(process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)", "Java"),
    path.join(process.env.LOCALAPPDATA || appDataRoot, "Programs"),
    path.join(process.env.APPDATA || "", ".minecraft", "runtime")
  ].filter(Boolean);

  const found = [];
  const seen = new Set();

  function addJava(javaPath) {
    if (!javaPath || seen.has(javaPath) || !fs.existsSync(javaPath)) return;
    seen.add(javaPath);
    const versionMatch = javaPath.match(/(?:jdk|jre|java|temurin|zulu|msopenjdk)[^\d]*(\d+)/i);
    found.push({
      path: javaPath,
      major: versionMatch ? Number(versionMatch[1]) : 0,
      label: path.basename(path.dirname(path.dirname(javaPath)))
    });
  }

  function walk(root, depth = 0) {
    if (!root || depth > 4 || !fs.existsSync(root)) return;
    const direct = path.join(root, "bin", "java.exe");
    addJava(direct);

    let entries = [];
    try {
      entries = fs.readdirSync(root, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const child = path.join(root, entry.name);
      const childJava = path.join(child, "bin", "java.exe");
      addJava(childJava);
      if (depth < 2 || /runtime|jdk|jre|java|temurin|zulu|microsoft|adoptium/i.test(entry.name)) {
        walk(child, depth + 1);
      }
    }
  }

  for (const root of roots) walk(root);
  return found.sort((a, b) => (b.major || 0) - (a.major || 0));
}

async function launchInstance(instanceId, launchOptions = {}, sender = null) {
  const instance = getInstance(instanceId);
  const updateProgress = createLaunchProgress(sender, instance);
  const running = runningProcesses.get(instance.id);
  if (running) {
    writeDebug(instance, `Minecraft is already running with PID ${running.pid}.`);
    updateProgress(100, "Minecraft is already running");
    return { pid: running.pid, debugLog: instanceDebugPath(instance), running: true };
  }

  updateProgress(1, `Launching ${instance.name}`);
  writeDebug(instance, `Launching ${instance.name}`, true);
  writeDebug(instance, `Instance path: ${instance.path}`);

  const settings = readSettings();
  let activeAccount = readAccounts().accounts.find((account) => account.id === settings.activeAccountId);
  if (!activeAccount) throw new Error("Select an account before launching.");
  updateProgress(4, "Checking account");
  activeAccount = await validateLaunchAccount(activeAccount, instance);

  updateProgress(8, "Resolving Minecraft profile");
  const { id: versionId, profile } = await resolveLaunchProfile(instance);
  const versionDir = path.join(appDataRoot, "versions", versionId);
  const clientJar = path.join(versionDir, `${versionId}.jar`);
  await downloadFile(profile.downloads.client.url, clientJar, instance, `${versionId} client`, scaleProgress(updateProgress, 10, 22, "Downloading Minecraft client"), {
    sha1: profile.downloads.client.sha1,
    size: profile.downloads.client.size
  });
  await prepareAssets(profile, instance, scaleProgress(updateProgress, 22, 50, "Preparing assets"));

  const nativeDir = path.join(instance.path, "natives", versionId);
  fs.rmSync(nativeDir, { recursive: true, force: true });
  const classpath = await prepareLibraries(profile, instance, nativeDir, scaleProgress(updateProgress, 50, 72, "Preparing libraries"));
  classpath.push(clientJar);
  writeDebug(instance, `Classpath entries: ${classpath.length}`);

  const authToken = activeAccount.minecraftAccessToken || activeAccount.accessToken || "0";
  const isMicrosoftAccount = activeAccount.type !== "offline";
  const launchUuid = normalizeLaunchUuid(activeAccount.uuid || activeAccount.id);
  const userType = isMicrosoftAccount ? "msa" : "legacy";
  writeDebug(instance, `Launch account: ${activeAccount.name} (${activeAccount.type})`);
  writeDebug(instance, `Launch UUID: ${launchUuid}`);
  writeDebug(instance, `Access token present: ${authToken && authToken !== "0" ? "yes" : "no"}`);
  writeDebug(instance, `XUID present: ${activeAccount.xuid ? "yes" : "no"}`);

  const context = {
    features: {
      is_demo_user: false,
      has_custom_resolution: true,
      has_quick_plays_support: false,
      is_quick_play_singleplayer: false,
      is_quick_play_multiplayer: false,
      is_quick_play_realms: false
    },
    natives_directory: nativeDir,
    launcher_name: "Dreame Launcher",
    launcher_version: app.getVersion(),
    classpath: classpath.join(path.delimiter),
    auth_player_name: activeAccount.name,
    version_name: profile.id || versionId,
    game_directory: instance.path,
    assets_root: path.join(appDataRoot, "assets"),
    assets_index_name: profile.assetIndex?.id || profile.assets || versionId,
    auth_uuid: launchUuid,
    auth_access_token: authToken,
    user_type: userType,
    user_properties: "{}",
    clientid: activeAccount.clientId || bundledMicrosoftClientId,
    auth_xuid: activeAccount.xuid || "",
    version_type: profile.type || "release",
    resolution_width: (instance.resolution || "854x480").split("x")[0],
    resolution_height: (instance.resolution || "854x480").split("x")[1]
  };

  const jvmArgs = getArgumentList(profile.arguments?.jvm || [
    "-Djava.library.path=${natives_directory}",
    "-cp",
    "${classpath}"
  ], context);
  const gameArgs = removeDemoArgs(removeQuickPlayArgs(getArgumentList(profile.arguments?.game || profile.minecraftArguments, context)));
  if (launchOptions.serverAddress) {
    gameArgs.push("--quickPlayMultiplayer", launchOptions.serverAddress);
  }
  const javaMajor = getRequiredJavaMajor(profile, instance);
  const extraJvmArgs = String(instance.extraJvmArgs || "").trim().split(/\s+/).filter(Boolean);
  const launchJvmArgs = removeUnsupportedJvmArgs([...extraJvmArgs, ...jvmArgs], javaMajor);
  const args = [
    `-Xmx${instance.ramMb || 4096}M`,
    `-Xms512M`,
    ...launchJvmArgs,
    profile.mainClass,
    ...gameArgs
  ];

  if (instance.fullscreen) args.push("--fullscreen");

  updateProgress(74, `Checking Java ${javaMajor}`);
  let java = findJavaExecutable(instance, javaMajor);
  if (java === "java") {
    java = await ensurePortableJava(instance, javaMajor, scaleProgress(updateProgress, 74, 92, `Installing Java ${javaMajor}`));
  } else {
    updateProgress(92, `Using Java ${javaMajor}`);
  }
  writeDebug(instance, `Required Java: ${javaMajor}`);
  writeDebug(instance, `Java: ${java}`);
  if (launchJvmArgs.length !== extraJvmArgs.length + jvmArgs.length) {
    writeDebug(instance, `Filtered JVM args for Java ${javaMajor}: ${extraJvmArgs.length + jvmArgs.length - launchJvmArgs.length} unsupported option(s) removed.`);
  }
  writeDebug(instance, `Main class: ${profile.mainClass}`);
  writeDebug(instance, `Game args: ${redactLaunchArgs(gameArgs).join(" ")}`);
  writeDebug(instance, `Demo arg present: ${gameArgs.includes("--demo") ? "yes" : "no"}`);
  writeDebug(instance, `Starting process...`);
  updateProgress(96, "Starting Minecraft");

  const child = spawn(java, args, {
    cwd: instance.path,
    windowsHide: false
  });
  runningProcesses.set(instance.id, child);
  updateProgress(100, "Minecraft launched");

  child.stdout.on("data", (data) => writeDebug(instance, data.toString()));
  child.stderr.on("data", (data) => writeDebug(instance, data.toString()));
  child.on("error", (error) => {
    runningProcesses.delete(instance.id);
    if (error.code === "ENOENT") {
      writeDebug(instance, "Java was not found. Choose a java.exe in the instance Configure panel or install Java and add it to PATH.");
    }
    writeDebug(instance, `Launch error: ${error.message}`);
    quitIfNoWindowsAndNoMinecraft();
  });
  child.on("exit", (code) => {
    runningProcesses.delete(instance.id);
    writeDebug(instance, `Minecraft exited with code ${code}`);
    quitIfNoWindowsAndNoMinecraft();
  });

  return { pid: child.pid, debugLog: instanceDebugPath(instance), running: true };
}

function getInstanceLaunchState(instanceId) {
  const child = runningProcesses.get(instanceId);
  return { running: Boolean(child), pid: child?.pid || null };
}

function stopInstance(instanceId) {
  const instance = getInstance(instanceId);
  const child = runningProcesses.get(instance.id);
  if (!child) {
    return { running: false, pid: null };
  }

  writeDebug(instance, `Stopping Minecraft process ${child.pid}...`);
  if (process.platform === "win32" && child.pid) {
    const killer = spawn("taskkill", ["/pid", String(child.pid), "/t", "/f"], { windowsHide: true });
    killer.on("error", (error) => {
      writeDebug(instance, `Stop error: ${error.message}`);
      child.kill();
    });
  } else {
    child.kill("SIGTERM");
  }

  return { running: true, pid: child.pid, stopping: true };
}

async function validateLaunchAccount(account, instance) {
  if (account.type === "offline") {
    writeDebug(instance, "Launching with an offline account. This cannot authenticate as a paid Minecraft account or join premium servers.");
    return account;
  }

  if (!account.minecraftAccessToken) {
    throw new Error("This Microsoft account has no Minecraft access token saved. Sign out and log in again.");
  }

  const originalAccountId = account.id;
  writeDebug(instance, `Validating Minecraft account session for ${account.name}`);
  try {
    account = await ensureFreshMinecraftAccount(account);
    const profile = await getJson("https://api.minecraftservices.com/minecraft/profile", {
      Authorization: `Bearer ${account.minecraftAccessToken}`
    });
    writeDebug(instance, `Minecraft profile verified: ${profile.name} (${profile.id})`);
    account.id = profile.id;
    account.uuid = profile.id;
    account.name = profile.name;

    const entitlements = await getJson("https://api.minecraftservices.com/entitlements/mcstore", {
      Authorization: `Bearer ${account.minecraftAccessToken}`
    });
    const items = Array.isArray(entitlements.items) ? entitlements.items : [];
    const ownsJava = items.some((item) => ["game_minecraft", "product_minecraft"].includes(item.name));
    writeDebug(instance, `Minecraft entitlements: ${items.map((item) => item.name).join(", ") || "none"}`);
    if (!ownsJava) {
      throw new Error("This Microsoft account signed in, but Minecraft Services did not report Java ownership. Dreame will not launch it as a paid session.");
    }
    persistVerifiedAccount(account, originalAccountId);
    return account;
  } catch (error) {
    writeDebug(instance, `Account validation failed: ${error.message}`);
    if (error.message.includes("Java ownership")) throw error;
    if (error.code === "MICROSOFT_RELOGIN_REQUIRED") throw error;
    throw new Error(`Could not validate your Minecraft account: ${error.message}`);
  }
}

ipcMain.handle("instances:launch", (event, instanceId) => launchInstance(instanceId, {}, event.sender));
ipcMain.handle("instances:launch-state", (_event, instanceId) => getInstanceLaunchState(instanceId));
ipcMain.handle("instances:stop", (_event, instanceId) => stopInstance(instanceId));
ipcMain.handle("modrinth:search", (_event, payload) => searchModrinth(payload || {}));
ipcMain.handle("modrinth:versions", (_event, projectId) => getModrinthVersions(projectId));
ipcMain.handle("modrinth:install-file", (event, payload) => installModrinthFile(payload || {}, event.sender));
ipcMain.handle("modrinth:install-pack", (event, versionId) => installModrinthPack(versionId, event.sender));
ipcMain.handle("modrinth:launch-server", (event, payload) => launchServerWithInstance(payload || {}, event.sender));

ipcMain.handle("java:list", () => detectJavaInstallations());

ipcMain.handle("instances:read-debug-log", (_event, instanceId) => {
  const instance = getInstance(instanceId);
  const logPath = instanceDebugPath(instance);
  if (!fs.existsSync(logPath)) return "";
  return fs.readFileSync(logPath, "utf8").slice(-50000);
});

ipcMain.handle("auth:create-offline-account", (_event, name) => {
  const cleanedName = String(name || "").trim().replace(/[^a-zA-Z0-9_]/g, "").slice(0, 16);
  if (cleanedName.length < 3) {
    throw new Error("Offline name must be 3-16 letters, numbers, or underscores.");
  }

  return upsertAccount(createOfflineAccount(cleanedName));
});

ipcMain.handle("auth:select-account", (_event, accountId) => selectAccount(accountId));

ipcMain.handle("auth:remove-account", (_event, accountId) => removeAccount(accountId));

ipcMain.handle("skins:save", (_event, payload) => saveSkinUpload(payload || {}));

ipcMain.handle("skins:refresh-profile", () => refreshMinecraftProfileSkin());

ipcMain.handle("skins:apply", async (_event, skinId) => {
  const data = readSkins();
  const skin = data.skins.find((item) => item.id === skinId);
  if (!skin || !fs.existsSync(skin.path)) throw new Error("Skin file not found.");

  const account = requireActiveAccount();
  const result = await uploadSkinToMinecraftProfile(account, skin);
  const activeSkinByAccount = { ...data.activeSkinByAccount, [account.id]: skin.id };
  const next = writeSkins({ activeSkinId: skin.id, activeSkinByAccount });
  return {
    ...readSkinsForRenderer(account.id),
    activeSkinId: activeSkinByAccount[account.id] || next.activeSkinId,
    uploaded: result.uploaded,
    message: result.uploaded ? "Skin changed on your Minecraft profile." : result.reason
  };
});

ipcMain.handle("skins:remove", (_event, skinId) => {
  const data = readSkins();
  const skin = data.skins.find((item) => item.id === skinId);
  if (skin?.path && fs.existsSync(skin.path)) fs.rmSync(skin.path, { force: true });
  const skins = data.skins.filter((item) => item.id !== skinId);
  const activeSkinByAccount = Object.fromEntries(
    Object.entries(data.activeSkinByAccount || {}).map(([accountId, activeId]) => [
      accountId,
      activeId === skinId ? skins[0]?.id || null : activeId
    ]).filter(([, activeId]) => Boolean(activeId))
  );
  const activeSkinId = data.activeSkinId === skinId ? skins[0]?.id || null : data.activeSkinId;
  const next = writeSkins({ skins, activeSkinId, activeSkinByAccount });
  return {
    ...readSkinsForRenderer(),
    skins: next.skins.map(skinToPublicRecord)
  };
});

ipcMain.handle("auth:start-microsoft-login", async (_event, clientId) => {
  const cleanClientId = String(clientId || bundledMicrosoftClientId).trim();
  if (!cleanClientId) {
    throw new Error("Dreame Launcher needs a Microsoft OAuth client ID before Microsoft login can work.");
  }

  const modernScope = "XboxLive.signin offline_access";
  const modernParams = new URLSearchParams({
    client_id: cleanClientId,
    scope: modernScope
  });

  let authMode = "entra-device-code";
  let response = await fetch("https://login.microsoftonline.com/consumers/oauth2/v2.0/devicecode", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: modernParams.toString()
  });

  let device = await response.json();
  if (!response.ok) {
    const legacyParams = new URLSearchParams({
      client_id: cleanClientId,
      scope: "service::user.auth.xboxlive.com::MBI_SSL",
      response_type: "device_code"
    });

    authMode = "live-connect";
    response = await fetch("https://login.live.com/oauth20_connect.srf", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: legacyParams.toString()
    });
    device = await response.json();
  }

  if (!response.ok) {
    throw new Error(device.error_description || "Could not start Microsoft login.");
  }

  await shell.openExternal(device.verification_uri);

  return {
    clientId: cleanClientId,
    userCode: device.user_code,
    verificationUri: device.verification_uri,
    message: device.message,
    expiresIn: device.expires_in,
    interval: device.interval,
    deviceCode: device.device_code,
    authMode,
    tokenEndpoint: authMode === "live-connect"
      ? "https://login.live.com/oauth20_token.srf"
      : "https://login.microsoftonline.com/consumers/oauth2/v2.0/token",
    tokenScope: authMode === "live-connect"
      ? "service::user.auth.xboxlive.com::MBI_SSL"
      : modernScope
  };
});

ipcMain.handle("auth:finish-microsoft-login", async (_event, payload) => {
  const token = await pollMicrosoftToken({
    clientId: String(payload.clientId || "").trim(),
    deviceCode: payload.deviceCode,
    interval: payload.interval || 5,
    tokenEndpoint: payload.tokenEndpoint,
    scope: payload.tokenScope
  });
  const account = await completeMinecraftLogin(
    token.access_token,
    payload.authMode === "live-connect" ? "" : "d=",
    {
      clientId: String(payload.clientId || "").trim(),
      refreshToken: token.refresh_token,
      tokenEndpoint: payload.tokenEndpoint,
      scope: payload.tokenScope
    }
  );
  return upsertAccount(account);
});

ipcMain.handle("auth:start-xal-login", async () => {
  const { xal } = await createXalContext();
  pendingXalRedirect = await xal.getRedirectUri();
  const redirectUrl = normalizeXalRedirect(pendingXalRedirect);
  clipboard.writeText(redirectUrl);
  await shell.openExternal(redirectUrl);
  return { redirect: redirectUrl, copied: true };
});

ipcMain.handle("auth:finish-xal-login", async (_event, redirectUri) => {
  const cleanRedirectUri = String(redirectUri || "").trim();
  if (!cleanRedirectUri) {
    throw new Error("Paste the full redirect URL Microsoft showed after login.");
  }

  const { xal, tokenStore } = await createXalContext();
  const authRedirect = pendingXalRedirect || await xal.getRedirectUri();
  await xal.authenticateUser(tokenStore, authRedirect, cleanRedirectUri);
  pendingXalRedirect = null;
  saveXalStore(tokenStore);

  const webToken = await xal.getWebToken();
  saveXalStore(tokenStore);

  const account = await minecraftLoginWithXalToken(webToken);
  return upsertAccount(account);
});
