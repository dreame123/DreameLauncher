const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

async function main() {
  const root = path.resolve(__dirname, "..");
  const electronRoot = path.join(root, "node_modules", "electron");
  const dist = path.join(electronRoot, "dist");
  const exe = path.join(dist, "electron.exe");
  const pathFile = path.join(electronRoot, "path.txt");

  console.log("Dreame Launcher Electron repair");
  console.log("Project:", root);

  if (!fs.existsSync(electronRoot)) {
    throw new Error("node_modules/electron is missing. Run npm.cmd install first.");
  }

  console.log("Loading downloader...");
  const { downloadArtifact } = require("@electron/get");
  console.log("Downloading Electron 31.7.7 for Windows x64...");
  const zip = await downloadArtifact({
    version: "31.7.7",
    artifactName: "electron",
    platform: "win32",
    arch: "x64"
  });

  console.log("Downloaded:", zip);
  console.log("Extracting to:", dist);
  fs.rmSync(dist, { recursive: true, force: true });
  fs.mkdirSync(dist, { recursive: true });

  const expanded = spawnSync("powershell.exe", [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-Command",
    `Expand-Archive -LiteralPath '${zip.replace(/'/g, "''")}' -DestinationPath '${dist.replace(/'/g, "''")}' -Force`
  ], {
    encoding: "utf8"
  });

  if (expanded.stdout) console.log(expanded.stdout.trim());
  if (expanded.stderr) console.error(expanded.stderr.trim());
  if (expanded.status !== 0) {
    throw new Error(`Expand-Archive failed with exit code ${expanded.status}.`);
  }

  fs.writeFileSync(pathFile, "electron.exe");

  console.log("path.txt:", fs.existsSync(pathFile));
  console.log("electron.exe:", fs.existsSync(exe));

  if (!fs.existsSync(exe)) {
    throw new Error("Electron extracted, but electron.exe is still missing.");
  }

  console.log("Electron is repaired. Now run: npm.cmd start");
}

main().catch((error) => {
  console.error("Repair failed:");
  console.error(error);
  process.exit(1);
});
