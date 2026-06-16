# Dreame Launcher

Dreame Launcher is a custom Electron Minecraft launcher for Windows. It is built to feel smooth, clean, and simple while still supporting instances, Microsoft login, offline accounts, Modrinth browsing, skins, recent servers, and packaged `.exe` builds.

## ✨ Features

- 🔐 Microsoft Minecraft Java login with device-code flow
- 👤 Offline accounts for singleplayer, LAN, and offline-mode servers
- 📦 Instance manager with version downloads and launch logs
- 🔎 Modrinth Explore page for modpacks, mods, resource packs, data packs, shaders, and servers
- 🧩 Modpack installation with searchable version selection
- 📁 Mod/resource pack/shader/data pack install into compatible instances
- 🌐 Recent server cards with one-click launch and auto-join
- 🎨 Skin selector with saved skins, upload support, and 3D preview
- 💜 Custom launcher logo and Windows installer icon
- ☕ Portable Java setup when needed
- 🪟 Windows `.exe` installer build with shortcut support

## ✅ Requirements

- Windows 10/11
- Node.js and npm
- A Microsoft account that owns Minecraft Java Edition for premium online play

Offline accounts can launch Minecraft, but they cannot join premium/authenticated servers.

## 🚀 Install

1. Go to the **[Releases](https://github.com/dreame123/DreameLauncher/releases/tag/DLauncher)** page on this GitHub repo.
2. Download the latest **Dreame Launcher Builder** or installer file.
3. Run the downloaded file.
4. Follow the setup window.
5. Open Dreame Launcher from your desktop or Start Menu shortcut.

The builder handles the setup for you, so you do not need to run npm commands manually.

## 📂 Project Structure

```text
main.js                 Electron main process, auth, launch, installs
preload.js              Safe IPC bridge for the renderer
renderer\index.html     App layout
renderer\app.js         UI logic
renderer\styles.css     Launcher styling
renderer\assets\        Logo and UI assets
scripts\                Build/helper scripts
build-exe.cmd           Windows build helper
```

## 📝 Notes

- Microsoft accounts must own Minecraft Java Edition to launch as a premium account.
- Offline accounts are supported for local play and offline-mode servers only.
- Modrinth installs depend on compatible Minecraft versions and loaders.
- Launcher data is saved locally in AppData.

## 📜 License

Add your license here before publishing publicly.
