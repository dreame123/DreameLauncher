const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("dreame", {
  getState: () => ipcRenderer.invoke("launcher:get-state"),
  saveSettings: (settings) => ipcRenderer.invoke("launcher:save-settings", settings),
  openDataFolder: () => ipcRenderer.invoke("launcher:open-data-folder"),
  copyText: (text) => ipcRenderer.invoke("launcher:copy-text", text),
  setTitleBarColor: (color) => ipcRenderer.invoke("launcher:set-titlebar-color", color),
  createOfflineAccount: (name) => ipcRenderer.invoke("auth:create-offline-account", name),
  selectAccount: (accountId) => ipcRenderer.invoke("auth:select-account", accountId),
  removeAccount: (accountId) => ipcRenderer.invoke("auth:remove-account", accountId),
  startMicrosoftLogin: (clientId) => ipcRenderer.invoke("auth:start-microsoft-login", clientId),
  finishMicrosoftLogin: (payload) => ipcRenderer.invoke("auth:finish-microsoft-login", payload),
  startXalLogin: () => ipcRenderer.invoke("auth:start-xal-login"),
  finishXalLogin: (redirectUri) => ipcRenderer.invoke("auth:finish-xal-login", redirectUri),
  saveSkin: (payload) => ipcRenderer.invoke("skins:save", payload),
  applySkin: (skinId) => ipcRenderer.invoke("skins:apply", skinId),
  removeSkin: (skinId) => ipcRenderer.invoke("skins:remove", skinId),
  refreshProfileSkin: () => ipcRenderer.invoke("skins:refresh-profile"),
  listInstances: () => ipcRenderer.invoke("instances:list"),
  saveInstance: (instance) => ipcRenderer.invoke("instances:save", instance),
  removeInstance: (instanceId) => ipcRenderer.invoke("instances:remove", instanceId),
  launchInstance: (instanceId) => ipcRenderer.invoke("instances:launch", instanceId),
  onLaunchProgress: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on("instances:launch-progress", listener);
    return () => ipcRenderer.removeListener("instances:launch-progress", listener);
  },
  onCreateProgress: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on("instances:create-progress", listener);
    return () => ipcRenderer.removeListener("instances:create-progress", listener);
  },
  getLaunchState: (instanceId) => ipcRenderer.invoke("instances:launch-state", instanceId),
  stopInstance: (instanceId) => ipcRenderer.invoke("instances:stop", instanceId),
  openInstanceFolder: (instanceId, subfolder) => ipcRenderer.invoke("instances:open-folder", instanceId, subfolder),
  chooseInstanceIcon: () => ipcRenderer.invoke("instances:choose-icon"),
  chooseJava: () => ipcRenderer.invoke("instances:choose-java"),
  importFilesToInstance: (instanceId, filePaths, targetFolder) => ipcRenderer.invoke("instances:import-files", instanceId, filePaths, targetFolder),
  chooseImportFiles: (instanceId, targetFolder) => ipcRenderer.invoke("instances:choose-import-files", instanceId, targetFolder),
  listInstanceFiles: (instanceId, folder) => ipcRenderer.invoke("instances:list-files", instanceId, folder),
  readDebugLog: (instanceId) => ipcRenderer.invoke("instances:read-debug-log", instanceId),
  deleteInstanceFile: (instanceId, folder, fileName) => ipcRenderer.invoke("instances:delete-file", instanceId, folder, fileName),
  toggleInstanceFile: (instanceId, folder, fileName, enabled) => ipcRenderer.invoke("instances:toggle-file", instanceId, folder, fileName, enabled),
  listJavaInstallations: () => ipcRenderer.invoke("java:list"),
  listMinecraftVersions: () => ipcRenderer.invoke("minecraft:list-versions"),
  searchModrinth: (payload) => ipcRenderer.invoke("modrinth:search", payload),
  listModrinthVersions: (projectId) => ipcRenderer.invoke("modrinth:versions", projectId),
  installModrinthFile: (payload) => ipcRenderer.invoke("modrinth:install-file", payload),
  installModrinthPack: (versionId) => ipcRenderer.invoke("modrinth:install-pack", versionId),
  listRecentServers: () => ipcRenderer.invoke("servers:recent"),
  onModrinthInstallProgress: (callback) => {
    const listener = (_event, payload) => callback(payload);
    ipcRenderer.on("modrinth:install-progress", listener);
    return () => ipcRenderer.removeListener("modrinth:install-progress", listener);
  },
  launchModrinthServer: (payload) => ipcRenderer.invoke("modrinth:launch-server", payload)
});
