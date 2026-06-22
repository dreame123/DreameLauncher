const accentInput = document.querySelector("#accent");
const dataPath = document.querySelector("#dataPath");
const openDataFolder = document.querySelector("#openDataFolder");
const profileName = document.querySelector("#profileName");
const swatches = document.querySelector("#swatches");
const themeOptions = document.querySelector("#themeOptions");
const settingsTabs = document.querySelector("#settingsTabs");
const appearanceSettings = document.querySelector("#appearanceSettings");
const languageSettings = document.querySelector("#languageSettings");
const languageSearch = document.querySelector("#languageSearch");
const languageList = document.querySelector("#languageList");
const selectedLanguageLabel = document.querySelector("#selectedLanguageLabel");
const accountAvatar = document.querySelector("#accountAvatar");
const accountName = document.querySelector("#accountName");
const accountType = document.querySelector("#accountType");
const authStatus = document.querySelector("#authStatus");
const launcherVersion = document.querySelector("#launcherVersion");
const updatePanel = document.querySelector(".update-panel");
const updateStatus = document.querySelector("#updateStatus");
const updateProgress = document.querySelector("#updateProgress");
const updateProgressLabel = document.querySelector("#updateProgressLabel");
const updateProgressPercent = document.querySelector("#updateProgressPercent");
const updateProgressFill = document.querySelector("#updateProgressFill");
const checkUpdateButton = document.querySelector("#checkUpdateButton");
const installUpdateButton = document.querySelector("#installUpdateButton");
const updateToast = document.querySelector("#updateToast");
const updateToastTitle = document.querySelector("#updateToastTitle");
const updateToastMessage = document.querySelector("#updateToastMessage");
const updateToastInstall = document.querySelector("#updateToastInstall");
const updateToastClose = document.querySelector("#updateToastClose");
const microsoftLogin = document.querySelector("#microsoftLogin");
const xalLogin = document.querySelector("#xalLogin");
const offlineLogin = document.querySelector("#offlineLogin");
const offlineAccountModal = document.querySelector("#offlineAccountModal");
const offlineAccountForm = document.querySelector("#offlineAccountForm");
const offlineAccountName = document.querySelector("#offlineAccountName");
const closeOfflineAccountModal = document.querySelector("#closeOfflineAccountModal");
const cancelOfflineAccount = document.querySelector("#cancelOfflineAccount");
const deleteInstanceModal = document.querySelector("#deleteInstanceModal");
const deleteInstanceMessage = document.querySelector("#deleteInstanceMessage");
const closeDeleteInstanceModal = document.querySelector("#closeDeleteInstanceModal");
const cancelDeleteInstance = document.querySelector("#cancelDeleteInstance");
const confirmDeleteInstance = document.querySelector("#confirmDeleteInstance");
const modrinthInstallModal = document.querySelector("#modrinthInstallModal");
const closeModrinthInstallModal = document.querySelector("#closeModrinthInstallModal");
const cancelModrinthInstall = document.querySelector("#cancelModrinthInstall");
const confirmModrinthInstall = document.querySelector("#confirmModrinthInstall");
const modrinthInstallTitle = document.querySelector("#modrinthInstallTitle");
const modrinthInstallSummary = document.querySelector("#modrinthInstallSummary");
const modrinthVersionWrap = document.querySelector("#modrinthVersionWrap");
const modrinthVersionSearch = document.querySelector("#modrinthVersionSearch");
const modrinthVersionButton = document.querySelector("#modrinthVersionButton");
const modrinthVersionLabel = document.querySelector("#modrinthVersionLabel");
const modrinthVersionMenu = document.querySelector("#modrinthVersionMenu");
const modrinthInstanceWrap = document.querySelector("#modrinthInstanceWrap");
const modrinthInstanceSelect = document.querySelector("#modrinthInstanceSelect");
const modrinthInstallProgress = document.querySelector("#modrinthInstallProgress");
const modrinthInstallProgressLabel = document.querySelector("#modrinthInstallProgressLabel");
const modrinthInstallProgressPercent = document.querySelector("#modrinthInstallProgressPercent");
const modrinthInstallProgressFill = document.querySelector("#modrinthInstallProgressFill");
const deviceCodeBox = document.querySelector("#deviceCodeBox");
const deviceCode = document.querySelector("#deviceCode");
const deviceCodeCopyHint = document.querySelector("#deviceCodeCopyHint");
const minecraftName = document.querySelector("#minecraftName");
const accountList = document.querySelector("#accountList");
const recentServersList = document.querySelector("#recentServersList");
const browseServersButton = document.querySelector("#browseServersButton");
const navItems = document.querySelectorAll(".nav-item");
const homeViews = document.querySelectorAll(".home-view");
const appViews = document.querySelectorAll(".app-view");
const instancesView = document.querySelector("#instancesView");
const instancesGrid = document.querySelector("#instancesGrid");
const instanceDetail = document.querySelector("#instanceDetail");
const createInstance = document.querySelector("#createInstance");
const refreshExplore = document.querySelector("#refreshExplore");
const exploreTabs = document.querySelector("#exploreTabs");
const exploreSearch = document.querySelector("#exploreSearch");
const exploreSearchButton = document.querySelector("#exploreSearchButton");
const exploreStatus = document.querySelector("#exploreStatus");
const exploreResults = document.querySelector("#exploreResults");
const explorePagination = document.querySelector("#explorePagination");
const skinView = document.querySelector("#skinView");
const skinLoginGate = document.querySelector("#skinLoginGate");
const skinGateTitle = document.querySelector("#skinGateTitle");
const skinGateMessage = document.querySelector("#skinGateMessage");
const skinUploadButton = document.querySelector("#skinUploadButton");
const skinFileInput = document.querySelector("#skinFileInput");
const skinGrid = document.querySelector("#skinGrid");
const skinStage = document.querySelector("#skinStage");
const skinModel = document.querySelector("#skinModel");
const skinPreviewName = document.querySelector("#skinPreviewName");
const skinChangeButton = document.querySelector("#skinChangeButton");
const skinRemoveButton = document.querySelector("#skinRemoveButton");
const skinStatus = document.querySelector("#skinStatus");
const instanceModal = document.querySelector("#instanceModal");
const instanceForm = document.querySelector("#instanceForm");
const closeInstanceModal = document.querySelector("#closeInstanceModal");
const backInstanceModal = document.querySelector("#backInstanceModal");
const instanceModalTitle = document.querySelector("#instanceModalTitle");
const instanceIconPreview = document.querySelector("#instanceIconPreview");
const selectInstanceIcon = document.querySelector("#selectInstanceIcon");
const removeInstanceIcon = document.querySelector("#removeInstanceIcon");
const instanceName = document.querySelector("#instanceName");
const gameVersion = document.querySelector("#gameVersion");
const loaderOptions = document.querySelector("#loaderOptions");
const loaderVersionOptions = document.querySelector("#loaderVersionOptions");
const customLoaderVersionWrap = document.querySelector("#customLoaderVersionWrap");
const customLoaderVersion = document.querySelector("#customLoaderVersion");
const instanceCreateProgress = document.querySelector("#instanceCreateProgress");
const instanceCreateProgressLabel = document.querySelector("#instanceCreateProgressLabel");
const instanceCreateProgressPercent = document.querySelector("#instanceCreateProgressPercent");
const instanceCreateProgressFill = document.querySelector("#instanceCreateProgressFill");

const presetColors = ["#7c5cff", "#00d6c9", "#ff4d8d", "#ffb020", "#39d353", "#4cc9f0"];
const languages = [
  { code: "en", name: "English", region: "United States" },
  { code: "ar", name: "Arabic", native: "العربية", region: "Middle East" },
  { code: "fr", name: "French", native: "Français", region: "France" },
  { code: "es", name: "Spanish", native: "Español", region: "Spain / Latin America" },
  { code: "de", name: "German", native: "Deutsch", region: "Germany" },
  { code: "it", name: "Italian", native: "Italiano", region: "Italy" },
  { code: "pt", name: "Portuguese", native: "Português", region: "Brazil / Portugal" },
  { code: "ru", name: "Russian", native: "Русский", region: "Russia" },
  { code: "zh", name: "Chinese", native: "中文", region: "China" },
  { code: "ja", name: "Japanese", native: "日本語", region: "Japan" },
  { code: "ko", name: "Korean", native: "한국어", region: "Korea" },
  { code: "nl", name: "Dutch", native: "Nederlands", region: "Netherlands" },
  { code: "pl", name: "Polish", native: "Polski", region: "Poland" },
  { code: "tr", name: "Turkish", native: "Türkçe", region: "Turkey" },
  { code: "sv", name: "Swedish", native: "Svenska", region: "Sweden" },
  { code: "no", name: "Norwegian", native: "Norsk", region: "Norway" },
  { code: "da", name: "Danish", native: "Dansk", region: "Denmark" },
  { code: "fi", name: "Finnish", native: "Suomi", region: "Finland" },
  { code: "hi", name: "Hindi", native: "हिन्दी", region: "India" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", region: "Indonesia" },
  { code: "uk", name: "Ukrainian", native: "Українська", region: "Ukraine" },
  { code: "cs", name: "Czech", native: "Čeština", region: "Czechia" },
  { code: "el", name: "Greek", native: "Ελληνικά", region: "Greece" },
  { code: "ro", name: "Romanian", native: "Română", region: "Romania" }
];
const englishTranslations = {
  "nav.home": "Home",
  "nav.explore": "Explore",
  "nav.instances": "Instances",
  "nav.skin": "Skin",
  "nav.settings": "Settings",
  "profile.ready": "Ready to play",
  "home.eyebrow": "Minecraft desktop launcher",
  "home.welcome": "Welcome back!",
  "home.jumpBack": "Jump back in",
  "home.browseServers": "Browse Servers",
  "home.launchingServer": "Launching {instance} and joining {server}...",
  "home.launchedServer": "Minecraft launched with {instance}. Joining {server}.",
  "home.copyServerAddress": "Copy server address",
  "home.copiedServer": "Copied {server}.",
  "home.noJoinedServers": "No joined servers yet",
  "home.joinServerHelp": "Join a server in Minecraft or launch one from Explore, then it appears here.",
  "home.played": "Played {time} • {instance}",
  "common.folder": "Folder",
  "common.openDataFolder": "Open data folder",
  "common.refresh": "Refresh",
  "common.search": "Search",
  "common.change": "Change",
  "common.remove": "Remove",
  "common.clickToCopy": "Click to copy",
  "common.copied": "Copied",
  "common.checking": "Checking...",
  "common.loading": "Loading...",
  "common.savingTo": "Saving to",
  "common.unknown": "Unknown",
  "common.play": "Play",
  "common.install": "Install",
  "common.installing": "Installing...",
  "common.launching": "Launching...",
  "common.stop": "Stop",
  "common.stopping": "Stopping...",
  "common.working": "Working...",
  "login.title": "Login",
  "login.noAccount": "No account selected",
  "login.addAccount": "Add Microsoft or local offline",
  "login.microsoft": "Microsoft Login",
  "login.xal": "Sisu/XAL Login",
  "login.offline": "Offline Account",
  "login.enterCode": "Enter this code in Microsoft",
  "login.help": "Microsoft login opens in your browser. If the account does not own Minecraft Java, Dreame Launcher will tell you.",
  "login.loginFirst": "Login first",
  "login.microsoftAccount": "Microsoft Minecraft account",
  "login.offlineAccount": "Offline account - no premium server access",
  "login.noSavedAccounts": "No saved accounts yet.",
  "login.signOut": "Sign out",
  "login.copiedCode": "Copied code {code}. Paste it into Microsoft.",
  "player.title": "Player",
  "player.minecraftName": "Minecraft name",
  "updates.title": "Updates",
  "updates.launcherVersion": "Launcher version",
  "updates.help": "Check GitHub Releases for a new launcher build.",
  "updates.downloading": "Downloading update...",
  "updates.downloadingShort": "Downloading...",
  "updates.check": "Check Update",
  "updates.checkAgain": "Check Again",
  "updates.install": "Install Update",
  "updates.installToast": "Install",
  "updates.checkingGithub": "Checking GitHub Releases...",
  "updates.upToDate": "Dreame Launcher is up to date.",
  "updates.readyTitle": "Update v{version} is ready",
  "updates.readyMessage": "Install it now and Dreame will reopen when it finishes.",
  "updates.downloaded": "Downloaded {name}. Starting installer...",
  "updates.available": "Update available: v{version}. Click Install Update to download and install it.",
  "updates.startingInstaller": "Starting installer...",
  "updates.downloadFailed": "Could not download the update installer.",
  "instances.eyebrow": "Profiles and modpacks",
  "instances.create": "Create Instance",
  "instances.empty": "Select an instance to configure folders, Java, memory, and files.",
  "explore.eyebrow": "Modrinth browser",
  "explore.modpacks": "Modpacks",
  "explore.mods": "Mods",
  "explore.resourcepacks": "Resource Packs",
  "explore.datapacks": "Data Packs",
  "explore.shaders": "Shaders",
  "explore.servers": "Servers",
  "explore.searchPlaceholder": "Search Modrinth...",
  "explore.help": "Search Modrinth for modpacks, mods, resource packs, data packs, shaders, and servers.",
  "explore.noServers": "No server results yet.",
  "explore.noResults": "No Modrinth results yet.",
  "explore.searchingServers": "Searching servers...",
  "explore.searchingModrinth": "Searching Modrinth {type}...",
  "explore.showing": "Showing {start}-{end} of {total} {type} from Modrinth.",
  "explore.showingServers": "Showing {start}-{end} of {total} servers.",
  "skin.eyebrow": "Player style",
  "skin.title": "Skin Selector",
  "skin.upload": "Upload Skin",
  "skin.notLoggedIn": "You are not logged in",
  "skin.loginHelp": "Login or select an account first, then you can upload, preview, and change skins.",
  "skin.loginMinecraftHelp": "Login or select a Minecraft account first, then you can upload, preview, and change skins.",
  "skin.notLoggedInStatus": "You are not logged in. Login first to use skins.",
  "skin.minecraftRequired": "Minecraft account required",
  "skin.offlineHelp": "The selected account is offline. Login with a Microsoft Minecraft Java account to change and load skins.",
  "skin.offlineStatus": "You need a Minecraft Java account to use skins. The selected account is offline.",
  "skin.noSelection": "No skin selected",
  "skin.drag": "Drag to rotate",
  "skin.status": "Upload a Minecraft skin PNG, select it, then click Change.",
  "skin.saved": "Saved skins",
  "skin.add": "Add skin",
  "skin.pngOnly": "PNG only",
  "settings.eyebrow": "Launcher preferences",
  "settings.appearance": "Appearance",
  "settings.language": "Language",
  "settings.theme": "Theme",
  "settings.colorTheme": "Color",
  "settings.grayTheme": "Black / Gray",
  "settings.uiColor": "UI Color",
  "settings.custom": "Custom",
  "settings.languageHelp": "Choose the launcher language. Search by language name or region.",
  "settings.searchLanguages": "Search languages...",
  "settings.noMatchingLanguages": "No matching languages."
};
const i18n = {
  en: englishTranslations,
  fr: {
    ...englishTranslations,
    "nav.home": "Accueil", "nav.explore": "Explorer", "nav.instances": "Instances", "nav.skin": "Skin", "nav.settings": "Paramètres",
    "profile.ready": "Prêt à jouer", "home.eyebrow": "Lanceur Minecraft desktop", "home.welcome": "Bon retour !", "home.jumpBack": "Reprendre", "home.browseServers": "Parcourir les serveurs",
    "common.folder": "Dossier", "common.refresh": "Actualiser", "common.search": "Rechercher", "common.change": "Changer", "common.remove": "Supprimer", "common.clickToCopy": "Cliquer pour copier", "common.copied": "Copié", "common.checking": "Vérification...", "common.loading": "Chargement...", "common.savingTo": "Enregistrement dans",
    "login.title": "Connexion", "login.noAccount": "Aucun compte sélectionné", "login.addAccount": "Ajouter Microsoft ou local hors ligne", "login.microsoft": "Connexion Microsoft", "login.offline": "Compte hors ligne", "login.enterCode": "Entre ce code dans Microsoft", "login.help": "La connexion Microsoft s’ouvre dans ton navigateur. Si le compte ne possède pas Minecraft Java, Dreame Launcher te le dira.", "login.loginFirst": "Connecte-toi d’abord",
    "player.title": "Joueur", "player.minecraftName": "Nom Minecraft", "updates.title": "Mises à jour", "updates.launcherVersion": "Version du lanceur", "updates.help": "Vérifie GitHub Releases pour une nouvelle version.", "updates.downloading": "Téléchargement de la mise à jour...", "updates.check": "Vérifier", "updates.install": "Installer",
    "instances.eyebrow": "Profils et modpacks", "instances.create": "Créer une instance", "instances.empty": "Sélectionne une instance pour configurer dossiers, Java, mémoire et fichiers.",
    "explore.eyebrow": "Navigateur Modrinth", "explore.modpacks": "Modpacks", "explore.mods": "Mods", "explore.resourcepacks": "Packs de ressources", "explore.datapacks": "Data packs", "explore.shaders": "Shaders", "explore.servers": "Serveurs", "explore.searchPlaceholder": "Rechercher sur Modrinth...", "explore.help": "Recherche des modpacks, mods, packs, data packs, shaders et serveurs.",
    "skin.eyebrow": "Style du joueur", "skin.title": "Sélecteur de skin", "skin.upload": "Importer un skin", "skin.notLoggedIn": "Tu n’es pas connecté", "skin.loginHelp": "Connecte-toi ou choisis un compte pour importer, prévisualiser et changer les skins.", "skin.noSelection": "Aucun skin sélectionné", "skin.drag": "Glisser pour tourner", "skin.status": "Importe un PNG Minecraft, sélectionne-le, puis clique sur Changer.", "skin.saved": "Skins sauvegardés", "skin.add": "Ajouter un skin", "skin.pngOnly": "PNG uniquement",
    "settings.eyebrow": "Préférences du lanceur", "settings.appearance": "Apparence", "settings.language": "Langue", "settings.theme": "Thème", "settings.colorTheme": "Couleur", "settings.grayTheme": "Noir / Gris", "settings.uiColor": "Couleur de l’UI", "settings.custom": "Personnalisé", "settings.languageHelp": "Choisis la langue du lanceur. Recherche par nom ou région.", "settings.searchLanguages": "Rechercher une langue..."
  },
  es: {
    ...englishTranslations,
    "nav.home": "Inicio", "nav.explore": "Explorar", "nav.instances": "Instancias", "nav.skin": "Skin", "nav.settings": "Ajustes",
    "profile.ready": "Listo para jugar", "home.eyebrow": "Lanzador de Minecraft", "home.welcome": "¡Bienvenido de nuevo!", "home.jumpBack": "Volver a jugar", "home.browseServers": "Ver servidores",
    "common.folder": "Carpeta", "common.refresh": "Actualizar", "common.search": "Buscar", "common.change": "Cambiar", "common.remove": "Eliminar", "common.clickToCopy": "Clic para copiar", "common.copied": "Copiado", "common.checking": "Comprobando...", "common.loading": "Cargando...", "common.savingTo": "Guardando en",
    "login.title": "Iniciar sesión", "login.noAccount": "No hay cuenta seleccionada", "login.addAccount": "Añade Microsoft o una cuenta local offline", "login.microsoft": "Login Microsoft", "login.offline": "Cuenta offline", "login.enterCode": "Introduce este código en Microsoft", "login.help": "El login de Microsoft se abre en tu navegador. Si la cuenta no tiene Minecraft Java, Dreame Launcher te avisará.", "login.loginFirst": "Inicia sesión primero",
    "player.title": "Jugador", "player.minecraftName": "Nombre de Minecraft", "updates.title": "Actualizaciones", "updates.launcherVersion": "Versión del launcher", "updates.help": "Busca una nueva versión en GitHub Releases.", "updates.downloading": "Descargando actualización...", "updates.check": "Comprobar", "updates.install": "Instalar",
    "instances.eyebrow": "Perfiles y modpacks", "instances.create": "Crear instancia", "instances.empty": "Selecciona una instancia para configurar carpetas, Java, memoria y archivos.",
    "explore.eyebrow": "Navegador Modrinth", "explore.resourcepacks": "Packs de recursos", "explore.datapacks": "Data packs", "explore.shaders": "Shaders", "explore.servers": "Servidores", "explore.searchPlaceholder": "Buscar en Modrinth...", "explore.help": "Busca modpacks, mods, packs de recursos, data packs, shaders y servidores.",
    "skin.eyebrow": "Estilo del jugador", "skin.title": "Selector de skin", "skin.upload": "Subir skin", "skin.notLoggedIn": "No has iniciado sesión", "skin.loginHelp": "Inicia sesión o selecciona una cuenta para subir, ver y cambiar skins.", "skin.noSelection": "Ningún skin seleccionado", "skin.drag": "Arrastra para rotar", "skin.status": "Sube un PNG de skin, selecciónalo y pulsa Cambiar.", "skin.saved": "Skins guardados", "skin.add": "Añadir skin", "skin.pngOnly": "Solo PNG",
    "settings.eyebrow": "Preferencias del launcher", "settings.appearance": "Apariencia", "settings.language": "Idioma", "settings.theme": "Tema", "settings.colorTheme": "Color", "settings.grayTheme": "Negro / Gris", "settings.uiColor": "Color de UI", "settings.custom": "Personalizado", "settings.languageHelp": "Elige el idioma del launcher. Busca por nombre o región.", "settings.searchLanguages": "Buscar idiomas..."
  },
  ar: {
    ...englishTranslations,
    "nav.home": "الرئيسية", "nav.explore": "استكشاف", "nav.instances": "العوالم", "nav.skin": "السكن", "nav.settings": "الإعدادات",
    "profile.ready": "جاهز للعب", "home.eyebrow": "مشغل ماينكرافت", "home.welcome": "مرحباً بعودتك!", "home.jumpBack": "ارجع للعب", "home.browseServers": "تصفح السيرفرات",
    "common.folder": "المجلد", "common.refresh": "تحديث", "common.search": "بحث", "common.change": "تغيير", "common.remove": "حذف", "common.clickToCopy": "اضغط للنسخ", "common.copied": "تم النسخ", "common.checking": "جار الفحص...", "common.loading": "جار التحميل...", "common.savingTo": "يتم الحفظ في",
    "login.title": "تسجيل الدخول", "login.noAccount": "لا يوجد حساب محدد", "login.addAccount": "أضف حساب Microsoft أو حساب offline", "login.microsoft": "دخول Microsoft", "login.offline": "حساب Offline", "login.enterCode": "أدخل هذا الكود في Microsoft", "login.help": "سيفتح تسجيل Microsoft في المتصفح. إذا لم يكن الحساب يملك Minecraft Java سيخبرك Dreame Launcher.", "login.loginFirst": "سجل الدخول أولاً",
    "player.title": "اللاعب", "player.minecraftName": "اسم ماينكرافت", "updates.title": "التحديثات", "updates.launcherVersion": "إصدار المشغل", "updates.help": "افحص GitHub Releases للحصول على إصدار جديد.", "updates.downloading": "جار تنزيل التحديث...", "updates.check": "فحص التحديث", "updates.install": "تثبيت التحديث",
    "instances.eyebrow": "البروفايلات والمودباكات", "instances.create": "إنشاء نسخة", "instances.empty": "اختر نسخة لإعداد المجلدات و Java والذاكرة والملفات.",
    "explore.eyebrow": "متصفح Modrinth", "explore.modpacks": "مودباكات", "explore.mods": "مودات", "explore.resourcepacks": "حزم الموارد", "explore.datapacks": "داتا باكس", "explore.shaders": "شيدرز", "explore.servers": "سيرفرات", "explore.searchPlaceholder": "ابحث في Modrinth...", "explore.help": "ابحث عن مودباكات ومودات وحزم موارد وداتا باكس وشيدرز وسيرفرات.",
    "skin.eyebrow": "ستايل اللاعب", "skin.title": "اختيار السكن", "skin.upload": "رفع سكن", "skin.notLoggedIn": "أنت غير مسجل", "skin.loginHelp": "سجل الدخول أو اختر حساباً أولاً لتستطيع رفع ومعاينة وتغيير السكنات.", "skin.noSelection": "لم يتم اختيار سكن", "skin.drag": "اسحب للتدوير", "skin.status": "ارفع ملف PNG لسكن ماينكرافت، اختره، ثم اضغط تغيير.", "skin.saved": "السكنات المحفوظة", "skin.add": "إضافة سكن", "skin.pngOnly": "PNG فقط",
    "settings.eyebrow": "تفضيلات المشغل", "settings.appearance": "المظهر", "settings.language": "اللغة", "settings.theme": "الثيم", "settings.colorTheme": "ألوان", "settings.grayTheme": "أسود / رمادي", "settings.uiColor": "لون الواجهة", "settings.custom": "مخصص", "settings.languageHelp": "اختر لغة المشغل. ابحث باسم اللغة أو المنطقة.", "settings.searchLanguages": "ابحث عن لغة..."
  },
  de: {
    ...englishTranslations,
    "nav.home": "Start", "nav.explore": "Entdecken", "nav.instances": "Instanzen", "nav.skin": "Skin", "nav.settings": "Einstellungen",
    "profile.ready": "Bereit zum Spielen", "home.welcome": "Willkommen zurück!", "home.jumpBack": "Weiterspielen", "home.browseServers": "Server durchsuchen",
    "common.folder": "Ordner", "common.refresh": "Aktualisieren", "common.search": "Suchen", "common.change": "Ändern", "common.remove": "Entfernen",
    "login.title": "Anmelden", "login.noAccount": "Kein Konto ausgewählt", "login.microsoft": "Microsoft-Anmeldung", "login.offline": "Offline-Konto",
    "updates.title": "Updates", "updates.check": "Update prüfen", "updates.install": "Update installieren",
    "settings.appearance": "Darstellung", "settings.language": "Sprache", "settings.theme": "Design", "settings.uiColor": "UI-Farbe", "settings.searchLanguages": "Sprachen suchen..."
  },
  pt: {
    ...englishTranslations,
    "nav.home": "Início", "nav.explore": "Explorar", "nav.instances": "Instâncias", "nav.settings": "Configurações",
    "home.welcome": "Bem-vindo de volta!", "home.jumpBack": "Voltar a jogar", "home.browseServers": "Ver servidores",
    "common.folder": "Pasta", "common.refresh": "Atualizar", "common.search": "Pesquisar", "common.change": "Alterar", "common.remove": "Remover",
    "login.title": "Entrar", "login.noAccount": "Nenhuma conta selecionada", "updates.title": "Atualizações",
    "settings.appearance": "Aparência", "settings.language": "Idioma", "settings.theme": "Tema", "settings.uiColor": "Cor da UI", "settings.searchLanguages": "Pesquisar idiomas..."
  },
  ru: {
    ...englishTranslations,
    "nav.home": "Главная", "nav.explore": "Обзор", "nav.instances": "Сборки", "nav.skin": "Скин", "nav.settings": "Настройки",
    "home.welcome": "С возвращением!", "home.jumpBack": "Продолжить", "home.browseServers": "Серверы",
    "common.folder": "Папка", "common.refresh": "Обновить", "common.search": "Поиск", "common.change": "Изменить", "common.remove": "Удалить",
    "login.title": "Вход", "login.noAccount": "Аккаунт не выбран", "updates.title": "Обновления",
    "settings.appearance": "Внешний вид", "settings.language": "Язык", "settings.theme": "Тема", "settings.uiColor": "Цвет интерфейса", "settings.searchLanguages": "Поиск языков..."
  },
  zh: {
    ...englishTranslations,
    "nav.home": "主页", "nav.explore": "探索", "nav.instances": "实例", "nav.skin": "皮肤", "nav.settings": "设置",
    "home.welcome": "欢迎回来！", "home.jumpBack": "继续游玩", "home.browseServers": "浏览服务器",
    "common.folder": "文件夹", "common.refresh": "刷新", "common.search": "搜索", "common.change": "更改", "common.remove": "删除",
    "login.title": "登录", "login.noAccount": "未选择账号", "updates.title": "更新",
    "settings.appearance": "外观", "settings.language": "语言", "settings.theme": "主题", "settings.uiColor": "界面颜色", "settings.searchLanguages": "搜索语言..."
  },
  ja: {
    ...englishTranslations,
    "nav.home": "ホーム", "nav.explore": "探索", "nav.instances": "インスタンス", "nav.skin": "スキン", "nav.settings": "設定",
    "home.welcome": "おかえりなさい！", "home.jumpBack": "再開", "home.browseServers": "サーバーを見る",
    "common.folder": "フォルダー", "common.refresh": "更新", "common.search": "検索", "common.change": "変更", "common.remove": "削除",
    "login.title": "ログイン", "login.noAccount": "アカウント未選択", "updates.title": "アップデート",
    "settings.appearance": "外観", "settings.language": "言語", "settings.theme": "テーマ", "settings.uiColor": "UIカラー", "settings.searchLanguages": "言語を検索..."
  },
  ko: {
    ...englishTranslations,
    "nav.home": "홈", "nav.explore": "탐색", "nav.instances": "인스턴스", "nav.skin": "스킨", "nav.settings": "설정",
    "home.welcome": "다시 오신 걸 환영합니다!", "home.jumpBack": "계속하기", "home.browseServers": "서버 보기",
    "common.folder": "폴더", "common.refresh": "새로고침", "common.search": "검색", "common.change": "변경", "common.remove": "삭제",
    "login.title": "로그인", "login.noAccount": "선택된 계정 없음", "updates.title": "업데이트",
    "settings.appearance": "외형", "settings.language": "언어", "settings.theme": "테마", "settings.uiColor": "UI 색상", "settings.searchLanguages": "언어 검색..."
  }
};
let saveTimer;
let selectedTheme = "color";
let selectedLanguage = "en";
let accounts = [];
let activeAccountId = null;
let instances = [];
let recentServers = [];
let selectedInstanceId = null;
let minecraftVersions = [];
let editingInstanceId = null;
let draftIconPath = "";
let selectedLoader = "vanilla";
let selectedLoaderVersionType = "stable";
let activeInstanceTab = "content";
let activeContentFilter = "all";
let activeFileFolder = "mods";
let instanceFiles = [];
let debugPollTimer = null;
let launchStatePollTimer = null;
let pendingDeleteInstanceId = null;
let activeExploreType = "modpacks";
let exploreItems = [];
let exploreTotalHits = 0;
let exploreOffset = 0;
const exploreLimit = 20;
let pendingModrinthProject = null;
let pendingModrinthVersions = [];
let selectedModrinthVersionId = "";
let modrinthCompatibleInstances = [];
let skins = [];
let activeSkinId = null;
let activeSkinByAccount = {};
let selectedSkinId = null;
let skinRotationX = 0;
let skinRotationY = -12;
let skinDragStart = null;
const refreshedProfileSkinAccounts = new Set();
const launchProgressByInstance = new Map();
let deviceCodeCopyTimer = null;
let downloadedUpdateInstaller = "";
let pendingLauncherUpdate = null;
let skinSpinFrame = null;
let skinViewer = null;
let skinThumbViewers = [];
const skinThumbAnimations = new Map();
const skinViewerCanvas = document.createElement("canvas");
skinViewerCanvas.className = "skin-webgl-preview";
skinViewerCanvas.width = 360;
skinViewerCanvas.height = 430;
skinStage.append(skinViewerCanvas);
skinModel.hidden = true;
const skinImageCache = new Map();
const skinCanvasAnimations = new WeakMap();

function resetSkinCamera() {
  skinRotationX = 0;
  skinRotationY = -12;
  updateSkinRotation();
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2;
}

function cancelSkinCanvasAnimation(canvas) {
  const frame = skinCanvasAnimations.get(canvas);
  if (frame) cancelAnimationFrame(frame);
  skinCanvasAnimations.delete(canvas);
}

function cancelSkinSpinAnimation() {
  if (skinSpinFrame) cancelAnimationFrame(skinSpinFrame);
  skinSpinFrame = null;
}

function animateSkinModel(fromYaw, toYaw, duration = 900, onDone = null) {
  cancelSkinSpinAnimation();
  const startedAt = performance.now();
  const startPitch = skinRotationX;
  const step = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = easeInOutCubic(progress);
    skinRotationY = fromYaw + (toYaw - fromYaw) * eased;
    skinRotationX = startPitch * (1 - eased);
    updateSkinRotation();
    if (progress < 1) {
      skinSpinFrame = requestAnimationFrame(step);
      return;
    }
    skinSpinFrame = null;
    onDone?.();
  };
  skinSpinFrame = requestAnimationFrame(step);
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function ensureSkinViewer() {
  if (skinViewer || !window.skinview3d?.SkinViewer) return skinViewer;
  skinViewer = new window.skinview3d.SkinViewer({
    canvas: skinViewerCanvas,
    width: 360,
    height: 430,
    enableControls: false
  });
  skinViewer.background = null;
  skinViewer.fov = 38;
  skinViewer.zoom = 0.88;
  skinViewer.autoRotate = false;
  skinViewer.globalLight.intensity = 1.7;
  skinViewer.cameraLight.intensity = 0.7;
  skinViewer.playerWrapper.rotation.y = degreesToRadians(skinRotationY);
  skinViewer.animation = new window.skinview3d.WalkingAnimation();
  skinViewer.animation.speed = 0.7;
  return skinViewer;
}

function updateSkinViewerSize() {
  if (!skinViewer) return;
  const rect = skinStage.getBoundingClientRect();
  skinViewer.width = Math.max(280, Math.min(390, Math.round(rect.width)));
  skinViewer.height = 430;
}

function cancelSkinThumbAnimation(viewer) {
  const frame = skinThumbAnimations.get(viewer);
  if (frame) cancelAnimationFrame(frame);
  skinThumbAnimations.delete(viewer);
}

function disposeSkinThumbViewers() {
  for (const viewer of skinThumbViewers) {
    cancelSkinThumbAnimation(viewer);
    viewer.dispose?.();
  }
  skinThumbViewers = [];
}

function createSkinThumbViewer(canvas, skin) {
  if (!window.skinview3d?.SkinViewer) return null;
  const viewer = new window.skinview3d.SkinViewer({
    canvas,
    width: 190,
    height: 210,
    enableControls: false,
    renderPaused: true
  });
  viewer.background = null;
  viewer.fov = 38;
  viewer.zoom = 0.84;
  viewer.autoRotate = false;
  viewer.globalLight.intensity = 1.75;
  viewer.cameraLight.intensity = 0.65;
  viewer.playerWrapper.rotation.y = degreesToRadians(-12);
  Promise.resolve(viewer.loadSkin(skin.dataUrl, { model: skin.variant === "slim" ? "slim" : "default" }))
    .then(() => viewer.render())
    .catch(() => {});
  skinThumbViewers.push(viewer);
  return viewer;
}

function animateSkinThumb(viewer, fromYaw, toYaw, duration = 720, onDone = null) {
  if (!viewer) return;
  cancelSkinThumbAnimation(viewer);
  const startedAt = performance.now();
  const step = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = easeInOutCubic(progress);
    viewer.playerWrapper.rotation.y = degreesToRadians(fromYaw + (toYaw - fromYaw) * eased);
    viewer.render();
    if (progress < 1) {
      skinThumbAnimations.set(viewer, requestAnimationFrame(step));
      return;
    }
    skinThumbAnimations.delete(viewer);
    onDone?.();
  };
  skinThumbAnimations.set(viewer, requestAnimationFrame(step));
}

function animateSkinCanvas(canvas, dataUrl, renderOptions, fromYaw, toYaw, duration = 900, onDone = null) {
  cancelSkinCanvasAnimation(canvas);
  const startedAt = performance.now();
  const step = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const eased = easeInOutCubic(progress);
    const yaw = fromYaw + (toYaw - fromYaw) * eased;
    renderSkinCanvas(canvas, dataUrl, { ...renderOptions, yaw });
    if (progress < 1) {
      skinCanvasAnimations.set(canvas, requestAnimationFrame(step));
      return;
    }
    skinCanvasAnimations.delete(canvas);
    onDone?.();
  };
  skinCanvasAnimations.set(canvas, requestAnimationFrame(step));
}

function loadSkinImage(dataUrl) {
  if (skinImageCache.has(dataUrl)) return skinImageCache.get(dataUrl);
  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUrl;
  });
  skinImageCache.set(dataUrl, promise);
  return promise;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const bigint = Number.parseInt(value, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255].join(", ");
}

function applyAccent(color) {
  document.documentElement.style.setProperty("--accent", color);
  document.documentElement.style.setProperty("--accent-rgb", hexToRgb(color));
  accentInput.value = color;
  window.dreame.setTitleBarColor?.(color).catch(() => {});
}

function applyTheme(theme) {
  selectedTheme = theme === "gray" ? "gray" : "color";
  document.body.dataset.theme = selectedTheme;
  themeOptions.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("selected", button.dataset.theme === selectedTheme);
  });
}

function getSelectedLanguage() {
  return languages.find((language) => language.code === selectedLanguage) || languages[0];
}

function tr(key) {
  return i18n[selectedLanguage]?.[key] || englishTranslations[key] || key;
}

function trf(key, values = {}) {
  return tr(key).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function translateStaticUi() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = tr(node.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = tr(node.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((node) => {
    node.title = tr(node.dataset.i18nTitle);
  });
}

function refreshTranslatedDynamicUi() {
  const account = accounts.find((item) => item.id === activeAccountId);
  if (account) {
    accountName.textContent = account.name;
    accountType.textContent = isMinecraftAccount(account)
      ? tr("login.microsoftAccount")
      : tr("login.offlineAccount");
    profileName.textContent = account.name;
    minecraftName.textContent = account.name;
  } else {
    accountName.textContent = tr("login.noAccount");
    accountType.textContent = tr("login.addAccount");
    profileName.textContent = tr("login.loginFirst");
    minecraftName.textContent = tr("login.loginFirst");
  }

  if (!deviceCodeBox?.classList.contains("copied")) {
    deviceCodeCopyHint.textContent = tr("common.clickToCopy");
  }

  if (deviceCode?.textContent.trim() === "----") authStatus.textContent = tr("login.help");
  if (updateStatus && !pendingLauncherUpdate) updateStatus.textContent = tr("updates.help");
  if (updateProgress?.hidden) updateProgressLabel.textContent = tr("updates.downloading");
  if (installUpdateButton?.hidden) installUpdateButton.textContent = tr("updates.install");
  if (checkUpdateButton && !checkUpdateButton.disabled && !pendingLauncherUpdate) {
    checkUpdateButton.textContent = tr("updates.check");
  }
  if (updateToastInstall && !updateToastInstall.disabled) updateToastInstall.textContent = tr("updates.installToast");

  renderAccounts();
  updateSkinAccess();
  renderExploreResults();
  if (!exploreItems.length) exploreStatus.textContent = tr("explore.help");
}

function applyLanguage(languageCode) {
  selectedLanguage = languages.some((language) => language.code === languageCode) ? languageCode : "en";
  const language = getSelectedLanguage();
  document.documentElement.lang = selectedLanguage;
  document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  document.body.dataset.language = selectedLanguage;
  if (selectedLanguageLabel) {
    selectedLanguageLabel.textContent = language.native ? `${language.name} / ${language.native}` : language.name;
  }
  translateStaticUi();
  renderLanguageList();
  refreshTranslatedDynamicUi();
}

function renderLanguageList() {
  if (!languageList) return;
  const query = (languageSearch?.value || "").trim().toLowerCase();
  languageList.innerHTML = "";
  const matches = languages.filter((language) => (
    [language.name, language.native, language.region, language.code]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query)
  ));

  if (!matches.length) {
    const empty = document.createElement("p");
    empty.className = "empty-accounts";
    empty.textContent = tr("settings.noMatchingLanguages");
    languageList.append(empty);
    return;
  }

  for (const language of matches) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "language-option";
    button.classList.toggle("selected", language.code === selectedLanguage);
    button.innerHTML = `
      <span class="language-code">${language.code.toUpperCase()}</span>
      <span class="language-copy">
        <strong>${language.name}</strong>
        <small>${[language.native, language.region].filter(Boolean).join(" - ")}</small>
      </span>
    `;
    button.addEventListener("click", () => {
      applyLanguage(language.code);
      queueSave();
    });
    languageList.append(button);
  }
}

function showSettingsTab(tab) {
  const activeTab = tab === "language" ? "language" : "appearance";
  settingsTabs?.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("selected", button.dataset.settingsTab === activeTab);
  });
  if (appearanceSettings) appearanceSettings.hidden = activeTab !== "appearance";
  if (languageSettings) languageSettings.hidden = activeTab !== "language";
}

function collectSettings() {
  const activeAccount = accounts.find((account) => account.id === activeAccountId);
  return {
    accent: accentInput.value,
    theme: selectedTheme,
    language: selectedLanguage,
    playerName: activeAccount?.name || tr("login.loginFirst")
  };
}

function queueSave() {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(async () => {
    const settings = await window.dreame.saveSettings(collectSettings());
    profileName.textContent = settings.playerName;
  }, 180);
}

function setUpdateProgress(percent, message) {
  const value = Math.max(0, Math.min(100, Math.round(Number(percent) || 0)));
  updateProgress.hidden = false;
  updateProgressLabel.textContent = message || tr("updates.downloading");
  updateProgressPercent.textContent = `${value}%`;
  updateProgressFill.style.width = `${value}%`;
}

function resetUpdateProgress() {
  updateProgress.hidden = true;
  updateProgressFill.style.width = "0%";
  updateProgressPercent.textContent = "0%";
  updateProgressLabel.textContent = tr("updates.downloading");
}

function showUpdateToast(update) {
  if (!updateToast || !update?.available) return;
  updateToastTitle.textContent = trf("updates.readyTitle", { version: update.latestVersion });
  updateToastMessage.textContent = tr("updates.readyMessage");
  updateToast.hidden = false;
  requestAnimationFrame(() => updateToast.classList.add("visible"));
}

function hideUpdateToast() {
  if (!updateToast) return;
  updateToast.classList.remove("visible");
  window.setTimeout(() => {
    if (!updateToast.classList.contains("visible")) updateToast.hidden = true;
  }, 220);
}

async function checkLauncherUpdate({ download = false } = {}) {
  if (!window.dreame.checkUpdate) return;
  if (!download) {
    downloadedUpdateInstaller = "";
    pendingLauncherUpdate = null;
    installUpdateButton.hidden = true;
    installUpdateButton.disabled = false;
    installUpdateButton.textContent = tr("updates.install");
  }
  checkUpdateButton.disabled = true;
  checkUpdateButton.textContent = download ? tr("updates.downloadingShort") : tr("common.checking");
  updateStatus.textContent = download ? tr("updates.downloading") : tr("updates.checkingGithub");
  if (!download) resetUpdateProgress();

  try {
    const result = download ? await window.dreame.downloadUpdate() : await window.dreame.checkUpdate();
    launcherVersion.textContent = result.currentVersion ? `v${result.currentVersion}` : tr("common.unknown");
    if (!result.available) {
      updatePanel?.classList.remove("is-update-ready");
      hideUpdateToast();
      updateStatus.textContent = result.message || tr("updates.upToDate");
      return result;
    }

    if (result.downloaded) {
      downloadedUpdateInstaller = result.installerPath;
      pendingLauncherUpdate = result;
      updatePanel?.classList.add("is-update-ready");
      showUpdateToast(result);
      updateStatus.textContent = trf("updates.downloaded", { name: result.releaseName || `v${result.latestVersion}` });
      installUpdateButton.hidden = false;
      checkUpdateButton.textContent = tr("updates.check");
      return result;
    }

    pendingLauncherUpdate = result;
    updatePanel?.classList.add("is-update-ready");
    showUpdateToast(result);
    updateStatus.textContent = trf("updates.available", { version: result.latestVersion });
    installUpdateButton.hidden = false;
    installUpdateButton.disabled = false;
    installUpdateButton.textContent = tr("updates.install");
    checkUpdateButton.textContent = tr("updates.checkAgain");
    return result;
  } catch (error) {
    updateStatus.textContent = error.message;
    return null;
  } finally {
    checkUpdateButton.disabled = false;
    if (!download && checkUpdateButton.textContent === tr("common.checking")) checkUpdateButton.textContent = tr("updates.check");
    if (download && checkUpdateButton.textContent === tr("updates.downloadingShort")) checkUpdateButton.textContent = tr("updates.check");
  }
}

async function installLatestLauncherUpdate() {
  if (!window.dreame.installUpdate) return;
  installUpdateButton.disabled = true;
  checkUpdateButton.disabled = true;
  updateToastInstall.disabled = true;
  installUpdateButton.textContent = tr("common.installing");
  updateToastInstall.textContent = tr("common.installing");
  try {
    let installerPath = downloadedUpdateInstaller;
    if (!installerPath) {
      const result = await checkLauncherUpdate({ download: true });
      if (!result?.downloaded || !result.installerPath) {
        throw new Error(tr("updates.downloadFailed"));
      }
      installerPath = result.installerPath;
    }
    updateStatus.textContent = tr("updates.startingInstaller");
    await window.dreame.installUpdate(installerPath);
  } catch (error) {
    installUpdateButton.disabled = false;
    checkUpdateButton.disabled = false;
    updateToastInstall.disabled = false;
    installUpdateButton.textContent = tr("updates.install");
    updateToastInstall.textContent = tr("updates.installToast");
    updateStatus.textContent = error.message;
    updateToastMessage.textContent = error.message;
  }
}

function isMinecraftAccount(account) {
  return account?.type !== "offline" && Boolean(account?.minecraftAccessToken);
}

function setActiveAccount(account) {
  if (!account) {
    activeAccountId = null;
    activeSkinId = null;
    selectedSkinId = null;
    accountName.textContent = tr("login.noAccount");
    accountType.textContent = tr("login.addAccount");
    accountAvatar.textContent = "DP";
    profileName.textContent = tr("login.loginFirst");
    minecraftName.textContent = tr("login.loginFirst");
    renderAccounts();
    updateSkinAccess();
    return;
  }

  activeAccountId = account.id;
  activeSkinId = activeSkinByAccount[activeAccountId] || null;
  selectedSkinId = activeSkinId;
  accountName.textContent = account.name;
  accountType.textContent = isMinecraftAccount(account)
    ? tr("login.microsoftAccount")
    : tr("login.offlineAccount");
  accountAvatar.textContent = account.name.slice(0, 2).toUpperCase();
  profileName.textContent = account.name;
  minecraftName.textContent = account.name;
  renderAccounts();
  updateSkinAccess();
  refreshProfileSkinForAccount(account);
}

function renderAccounts() {
  accountList.innerHTML = "";

  if (accounts.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-accounts";
    empty.textContent = tr("login.noSavedAccounts");
    accountList.append(empty);
    return;
  }

  for (const account of accounts) {
    const row = document.createElement("button");
    row.className = `account-item${account.id === activeAccountId ? " selected" : ""}`;
    row.type = "button";
    row.addEventListener("click", async () => {
      const selected = await window.dreame.selectAccount(account.id);
      setActiveAccount(selected);
    });

    const avatar = document.createElement("span");
    avatar.className = "mini-avatar";
    avatar.textContent = account.name.slice(0, 2).toUpperCase();

    const details = document.createElement("span");
    details.className = "account-details";

    const name = document.createElement("strong");
    name.textContent = account.name;

    const type = document.createElement("small");
    type.textContent = account.type === "offline" ? tr("login.offline") : "Microsoft";

    const remove = document.createElement("span");
    remove.className = "remove-account";
    remove.textContent = tr("login.signOut");
    remove.addEventListener("click", async (event) => {
      event.stopPropagation();
      const result = await window.dreame.removeAccount(account.id);
      accounts = result.accounts;
      setActiveAccount(accounts.find((item) => item.id === result.settings.activeAccountId));
    });

    details.append(name, type);
    row.append(avatar, details, remove);
    accountList.append(row);
  }
}

function renderRecentServersLegacy() {
  recentServersList.innerHTML = "";
  const available = recentServers.filter((server) => instances.some((instance) => instance.id === server.instanceId));

  if (available.length === 0) {
    const empty = document.createElement("div");
    empty.className = "recent-servers-empty";
    empty.innerHTML = "<strong>No recent servers yet</strong><span>Open Explore, choose Servers, then launch one with an instance.</span>";
    recentServersList.append(empty);
    return;
  }

  for (const server of available) {
    const instance = instances.find((item) => item.id === server.instanceId);
    const card = document.createElement("article");
    card.className = "recent-server-card";

    const icon = document.createElement("div");
    icon.className = "recent-server-icon";
    if (server.iconUrl) icon.style.backgroundImage = `url("${server.iconUrl}")`;
    else icon.textContent = "S";

    const details = document.createElement("div");
    details.className = "recent-server-details";
    const title = document.createElement("strong");
    title.textContent = server.title || server.address;
    const address = document.createElement("span");
    address.textContent = server.address;
    const instanceLabel = document.createElement("small");
    instanceLabel.textContent = `${instance.name} · ${instanceLoaderLabel(instance.loader)} ${instance.gameVersion}`;
    details.append(title, address, instanceLabel);

    const play = document.createElement("button");
    play.className = "play-button recent-server-play";
    play.innerHTML = `<span class="play-icon"></span><span>${tr("common.play")}</span>`;
    play.addEventListener("click", async () => {
      try {
        play.disabled = true;
        play.innerHTML = `<span class="server-launch-spinner"></span><span>${tr("common.launching")}</span>`;
        authStatus.textContent = trf("home.launchingServer", { instance: instance.name, server: server.address });
        const result = await window.dreame.launchModrinthServer({
          instanceId: server.instanceId,
          address: server.address,
          title: server.title,
          iconUrl: server.iconUrl
        });
        recentServers = result.recentServers || recentServers;
        renderRecentServers();
        authStatus.textContent = trf("home.launchedServer", { instance: instance.name, server: server.address });
      } catch (error) {
        authStatus.textContent = error.message;
        play.disabled = false;
        play.innerHTML = `<span class="play-icon"></span><span>${tr("common.play")}</span>`;
      }
    });

    card.append(icon, details, play);
    recentServersList.append(card);
  }
}

function renderRecentServers() {
  recentServersList.innerHTML = "";
  const available = recentServers.filter((server) => instances.some((instance) => instance.id === server.instanceId));

  if (available.length === 0) {
    const empty = document.createElement("div");
    empty.className = "recent-servers-empty";
    const title = document.createElement("strong");
    title.textContent = tr("home.noJoinedServers");
    const help = document.createElement("span");
    help.textContent = tr("home.joinServerHelp");
    empty.append(title, help);
    recentServersList.append(empty);
    return;
  }

  for (const server of available) {
    const instance = instances.find((item) => item.id === server.instanceId);
    const card = document.createElement("article");
    card.className = "recent-server-card";

    const icon = document.createElement("div");
    icon.className = "recent-server-icon";
    if (server.iconUrl) icon.style.backgroundImage = `url("${server.iconUrl}")`;
    else icon.textContent = "S";

    const details = document.createElement("div");
    details.className = "recent-server-details";
    const heading = document.createElement("div");
    heading.className = "recent-server-heading";
    const title = document.createElement("strong");
    title.textContent = server.title || server.address;
    const online = document.createElement("span");
    online.className = "recent-server-online";
    online.textContent = "server";
    heading.append(title, online);

    const motd = document.createElement("span");
    motd.className = "recent-server-motd";
    motd.textContent = server.description || server.address;

    const meta = document.createElement("small");
    meta.textContent = `Played ${formatRelativeTime(server.lastJoinedAt)} • ${instance.name}`;

    const address = document.createElement("span");
    address.className = "recent-server-address";
    address.textContent = server.address;
    details.append(heading, motd, meta, address);

    const play = document.createElement("button");
    play.className = "play-button recent-server-play";
    play.innerHTML = `<span class="play-icon"></span><span>${tr("common.play")}</span>`;
    play.addEventListener("click", async () => {
      try {
        play.disabled = true;
        play.innerHTML = `<span class="server-launch-spinner"></span><span>${tr("common.launching")}</span>`;
        authStatus.textContent = trf("home.launchingServer", { instance: instance.name, server: server.address });
        const result = await window.dreame.launchModrinthServer({
          instanceId: server.instanceId,
          address: server.address,
          title: server.title,
          iconUrl: server.iconUrl,
          description: server.description
        });
        recentServers = result.recentServers || recentServers;
        renderRecentServers();
        authStatus.textContent = trf("home.launchedServer", { instance: instance.name, server: server.address });
      } catch (error) {
        authStatus.textContent = error.message;
        play.disabled = false;
        play.innerHTML = `<span class="play-icon"></span><span>${tr("common.play")}</span>`;
      }
    });

    const menu = document.createElement("button");
    menu.className = "recent-server-menu";
    menu.title = tr("home.copyServerAddress");
    menu.textContent = "⋮";
    menu.addEventListener("click", async () => {
      await window.dreame.copyText(server.address);
      authStatus.textContent = trf("home.copiedServer", { server: server.address });
    });

    card.append(icon, details, play, menu);
    recentServersList.append(card);
  }
}

async function refreshRecentServers() {
  if (!window.dreame.listRecentServers) return;
  try {
    recentServers = await window.dreame.listRecentServers();
    renderRecentServers();
  } catch (error) {
    console.warn(error);
  }
}

function buildSwatches() {
  for (const color of presetColors) {
    const button = document.createElement("button");
    button.className = "swatch";
    button.style.setProperty("--swatch", color);
    button.title = color;
    button.addEventListener("click", () => {
      applyAccent(color);
      queueSave();
    });
    swatches.append(button);
  }
}

function showView(view) {
  navItems.forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  homeViews.forEach((item) => { item.hidden = view !== "home"; });
  appViews.forEach((item) => { item.hidden = item.id !== `${view}View`; });
  if (view === "home") refreshRecentServers();
  if (view === "explore" && exploreItems.length === 0) searchExplore();
  if (view === "skin") updateSkinAccess();
}

function selectedSkin() {
  return skins.find((skin) => skin.id === selectedSkinId) || skins.find((skin) => skin.id === activeSkinId) || null;
}

function setSkinModelFace(model, part, face, x, y, scale = 9) {
  const node = model.querySelector(`.${part} .${face}`);
  if (!node) return;
  node.style.backgroundPosition = `-${x * scale}px -${y * scale}px`;
}

function applySkinTextureToModel(model, dataUrl, scale = 9) {
  model.style.setProperty("--skin-texture", `url("${dataUrl}")`);
  model.style.setProperty("--skin-sheet-size", `${64 * scale}px`);
  const maps = {
    "skin-head": {
      top: [8, 0], bottom: [16, 0], right: [0, 8], front: [8, 8], left: [16, 8], back: [24, 8]
    },
    "skin-body": {
      top: [20, 16], bottom: [28, 16], right: [16, 20], front: [20, 20], left: [28, 20], back: [32, 20]
    },
    "skin-arm-left": {
      top: [44, 16], bottom: [48, 16], right: [40, 20], front: [44, 20], left: [48, 20], back: [52, 20]
    },
    "skin-arm-right": {
      top: [36, 48], bottom: [40, 48], right: [32, 52], front: [36, 52], left: [40, 52], back: [44, 52]
    },
    "skin-leg-left": {
      top: [4, 16], bottom: [8, 16], right: [0, 20], front: [4, 20], left: [8, 20], back: [12, 20]
    },
    "skin-leg-right": {
      top: [20, 48], bottom: [24, 48], right: [16, 52], front: [20, 52], left: [24, 52], back: [28, 52]
    }
  };

  for (const [part, faces] of Object.entries(maps)) {
    for (const [face, coords] of Object.entries(faces)) {
      setSkinModelFace(model, part, face, coords[0], coords[1], scale);
    }
  }
}

function applySkinTexture(dataUrl) {
  applySkinTextureToModel(skinModel, dataUrl);
}

function createSkinModel(dataUrl, className = "") {
  const model = document.createElement("div");
  model.className = `skin-model ${className}`.trim();
  model.innerHTML = skinModel.innerHTML;
  applySkinTextureToModel(model, dataUrl);
  return model;
}

function faceRect(x, y, width, height) {
  return { x, y, width, height };
}

const skinParts = {
  head: {
    x: -4, y: 0, z: -2, w: 8, h: 8, d: 8,
    faces: {
      top: faceRect(8, 0, 8, 8),
      front: faceRect(8, 8, 8, 8),
      back: faceRect(24, 8, 8, 8),
      left: faceRect(16, 8, 8, 8),
      right: faceRect(0, 8, 8, 8)
    },
    overlay: {
      top: faceRect(40, 0, 8, 8),
      front: faceRect(40, 8, 8, 8),
      back: faceRect(56, 8, 8, 8),
      left: faceRect(48, 8, 8, 8),
      right: faceRect(32, 8, 8, 8)
    }
  },
  body: {
    x: -4, y: 8, z: 0, w: 8, h: 12, d: 4,
    faces: {
      top: faceRect(20, 16, 8, 4),
      front: faceRect(20, 20, 8, 12),
      back: faceRect(32, 20, 8, 12),
      left: faceRect(28, 20, 4, 12),
      right: faceRect(16, 20, 4, 12)
    },
    overlay: {
      top: faceRect(20, 32, 8, 4),
      front: faceRect(20, 36, 8, 12),
      back: faceRect(32, 36, 8, 12),
      left: faceRect(28, 36, 4, 12),
      right: faceRect(16, 36, 4, 12)
    }
  },
  leftArm: {
    x: -8, y: 8, z: 0, w: 4, h: 12, d: 4,
    faces: {
      top: faceRect(36, 48, 4, 4),
      front: faceRect(36, 52, 4, 12),
      back: faceRect(44, 52, 4, 12),
      left: faceRect(40, 52, 4, 12),
      right: faceRect(32, 52, 4, 12)
    },
    overlay: {
      top: faceRect(52, 48, 4, 4),
      front: faceRect(52, 52, 4, 12),
      back: faceRect(60, 52, 4, 12),
      left: faceRect(56, 52, 4, 12),
      right: faceRect(48, 52, 4, 12)
    }
  },
  rightArm: {
    x: 4, y: 8, z: 0, w: 4, h: 12, d: 4,
    faces: {
      top: faceRect(44, 16, 4, 4),
      front: faceRect(44, 20, 4, 12),
      back: faceRect(52, 20, 4, 12),
      left: faceRect(48, 20, 4, 12),
      right: faceRect(40, 20, 4, 12)
    },
    overlay: {
      top: faceRect(44, 32, 4, 4),
      front: faceRect(44, 36, 4, 12),
      back: faceRect(52, 36, 4, 12),
      left: faceRect(48, 36, 4, 12),
      right: faceRect(40, 36, 4, 12)
    }
  },
  leftLeg: {
    x: -4, y: 20, z: 0, w: 4, h: 12, d: 4,
    faces: {
      top: faceRect(20, 48, 4, 4),
      front: faceRect(20, 52, 4, 12),
      back: faceRect(28, 52, 4, 12),
      left: faceRect(24, 52, 4, 12),
      right: faceRect(16, 52, 4, 12)
    },
    overlay: {
      top: faceRect(4, 48, 4, 4),
      front: faceRect(4, 52, 4, 12),
      back: faceRect(12, 52, 4, 12),
      left: faceRect(8, 52, 4, 12),
      right: faceRect(0, 52, 4, 12)
    }
  },
  rightLeg: {
    x: 0, y: 20, z: 0, w: 4, h: 12, d: 4,
    faces: {
      top: faceRect(4, 16, 4, 4),
      front: faceRect(4, 20, 4, 12),
      back: faceRect(12, 20, 4, 12),
      left: faceRect(8, 20, 4, 12),
      right: faceRect(0, 20, 4, 12)
    },
    overlay: {
      top: faceRect(4, 32, 4, 4),
      front: faceRect(4, 36, 4, 12),
      back: faceRect(12, 36, 4, 12),
      left: faceRect(8, 36, 4, 12),
      right: faceRect(0, 36, 4, 12)
    }
  }
};

function drawSkinFace(ctx, image, rect, point, u, v, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.moveTo(point.x, point.y);
  ctx.lineTo(point.x + u.x, point.y + u.y);
  ctx.lineTo(point.x + u.x + v.x, point.y + u.y + v.y);
  ctx.lineTo(point.x + v.x, point.y + v.y);
  ctx.closePath();
  ctx.clip();
  ctx.transform(u.x / rect.width, u.y / rect.width, v.x / rect.height, v.y / rect.height, point.x, point.y);
  ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height, 0, 0, rect.width, rect.height);
  ctx.restore();
}

async function renderSkinCanvas(canvas, dataUrl, options = {}) {
  const image = await loadSkinImage(dataUrl);
  const width = options.width || canvas.width || 360;
  const height = options.height || canvas.height || 430;
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = false;

  const unit = options.scale || 8.5;
  const yaw = ((options.yaw ?? -12) * Math.PI) / 180;
  const pitch = Math.max(-18, Math.min(18, options.pitch ?? 0));
  const center = width / 2;
  const turn = Math.min(1, Math.abs(Math.sin(yaw)));
  const sideSign = Math.sin(yaw) < 0 ? 1 : -1;
  const showingBack = Math.cos(yaw) < -0.08;
  const frontFace = showingBack ? "back" : "front";
  const sideFace = sideSign > 0 ? "left" : "right";
  const depthX = sideSign * unit * (0.72 + turn * 0.75);
  const depthY = -unit * (0.32 + turn * 0.22) + pitch * 0.05 * unit;
  const top = (options.top || 34) + pitch * 0.22;

  const headW = unit * 8;
  const headH = unit * 8;
  const bodyW = unit * 8;
  const bodyH = unit * 12;
  const limbW = unit * 4;
  const limbH = unit * 12;
  const gap = unit * 0.48;
  const headX = center - headW / 2;
  const headY = top + unit * 0.6;
  const bodyX = center - bodyW / 2;
  const bodyY = headY + headH + unit * 0.5;
  const armY = bodyY + unit * 0.2;
  const leftArmX = bodyX - limbW - gap;
  const rightArmX = bodyX + bodyW + gap;
  const legY = bodyY + bodyH + unit * 0.12;
  const leftLegX = bodyX + unit * 0.1;
  const rightLegX = bodyX + bodyW - limbW - unit * 0.1;
  const feetY = legY + limbH + unit * 0.75;

  const glow = ctx.createRadialGradient(center, feetY, unit * 1.2, center, feetY, unit * 8);
  glow.addColorStop(0, "rgba(0, 0, 0, 0.22)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(center - unit * 10, feetY - unit * 3.2, unit * 20, unit * 6.4);

  const drawRectFace = (rect, x, y, w, h, alpha = 1) => {
    if (!rect) return;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.drawImage(image, rect.x, rect.y, rect.width, rect.height, Math.round(x), Math.round(y), Math.round(w), Math.round(h));
    ctx.restore();
  };

  const drawFilteredQuad = (rect, point, u, v, brightness, alpha = 1) => {
    if (!rect) return;
    ctx.save();
    ctx.filter = `brightness(${brightness})`;
    drawSkinFace(ctx, image, rect, point, u, v, alpha);
    ctx.restore();
  };

  const drawCube = (partKey, x, y, w, h, optionsForPart = {}) => {
    const part = skinParts[partKey];
    const topDepth = optionsForPart.topDepth ?? depthY;
    const sideDepthX = optionsForPart.depthX ?? depthX;
    const sideDepthY = optionsForPart.depthY ?? depthY;
    const sideAnchorX = sideDepthX > 0 ? x + w : x;
    const sideU = { x: sideDepthX, y: sideDepthY };
    const sideV = { x: 0, y: h };
    const topPoint = { x, y };
    const topU = { x: w, y: 0 };
    const topV = { x: sideDepthX, y: topDepth };

    ctx.save();
    ctx.shadowColor = optionsForPart.shadow === false ? "transparent" : "rgba(0, 0, 0, 0.32)";
    ctx.shadowBlur = optionsForPart.shadow === false ? 0 : unit * 0.7;
    ctx.shadowOffsetY = unit * 0.55;

    drawFilteredQuad(part.faces.top, topPoint, topU, topV, 1.1);
    drawFilteredQuad(part.faces[sideFace], { x: sideAnchorX, y }, sideU, sideV, 0.72);
    drawRectFace(part.faces[frontFace], x, y, w, h);

    if (part.overlay) {
      drawFilteredQuad(part.overlay.top, topPoint, topU, topV, 1.14, 0.92);
      drawFilteredQuad(part.overlay[sideFace], { x: sideAnchorX, y }, sideU, sideV, 0.78, 0.92);
      drawRectFace(part.overlay[frontFace], x, y, w, h, 0.94);
    }

    ctx.restore();
  };

  const nearLeft = sideSign > 0;
  const farArm = nearLeft ? "rightArm" : "leftArm";
  const nearArm = nearLeft ? "leftArm" : "rightArm";
  const farArmX = nearLeft ? rightArmX : leftArmX;
  const nearArmX = nearLeft ? leftArmX : rightArmX;
  const farLeg = nearLeft ? "rightLeg" : "leftLeg";
  const nearLeg = nearLeft ? "leftLeg" : "rightLeg";
  const farLegX = nearLeft ? rightLegX : leftLegX;
  const nearLegX = nearLeft ? leftLegX : rightLegX;
  const limbDepthX = depthX * 0.72;
  const limbDepthY = depthY * 0.82;

  drawCube(farArm, farArmX, armY, limbW, limbH, { depthX: limbDepthX, depthY: limbDepthY });
  drawCube(farLeg, farLegX, legY, limbW, limbH, { depthX: limbDepthX, depthY: limbDepthY });
  drawCube("body", bodyX, bodyY, bodyW, bodyH, { topDepth: depthY * 0.55 });
  drawCube("head", headX, headY, headW, headH);
  drawCube(nearLeg, nearLegX, legY, limbW, limbH, { depthX: limbDepthX, depthY: limbDepthY });
  drawCube(nearArm, nearArmX, armY, limbW, limbH, { depthX: limbDepthX, depthY: limbDepthY });
}

function updateSkinAccess() {
  const account = accounts.find((item) => item.id === activeAccountId);
  const loggedIn = Boolean(account);
  const minecraftAccount = isMinecraftAccount(account);
  skinView.classList.toggle("logged-out", !loggedIn || !minecraftAccount);
  skinUploadButton.disabled = !minecraftAccount;
  skinChangeButton.disabled = !minecraftAccount || !selectedSkin();
  skinRemoveButton.disabled = !minecraftAccount || !selectedSkin();

  if (!loggedIn) {
    skinLoginGate.hidden = false;
    skinGateTitle.textContent = tr("skin.notLoggedIn");
    skinGateMessage.textContent = tr("skin.loginMinecraftHelp");
    skinStatus.textContent = tr("skin.notLoggedInStatus");
    activeSkinId = null;
    selectedSkinId = null;
    renderSkins();
    return;
  }

  if (!minecraftAccount) {
    skinLoginGate.hidden = false;
    skinGateTitle.textContent = tr("skin.minecraftRequired");
    skinGateMessage.textContent = tr("skin.offlineHelp");
    skinStatus.textContent = tr("skin.offlineStatus");
    activeSkinId = null;
    selectedSkinId = null;
    renderSkins();
    return;
  }

  skinLoginGate.hidden = true;
  activeSkinId = activeSkinByAccount[activeAccountId] || null;
  selectedSkinId = activeSkinId;
  skinStatus.textContent = tr("skin.status");
  renderSkins();
}

function setSkinPreview(skin) {
  if (!skin) {
    skinPreviewName.textContent = tr("skin.noSelection");
    skinModel.style.removeProperty("--skin-texture");
    skinModel.hidden = true;
    skinViewerCanvas.hidden = true;
    skinViewer?.loadSkin(null);
    skinChangeButton.disabled = true;
    skinRemoveButton.disabled = true;
    return;
  }

  selectedSkinId = skin.id;
  skinPreviewName.textContent = skin.name;
  skinModel.hidden = true;
  skinViewerCanvas.hidden = false;
  applySkinTexture(skin.dataUrl);
  const viewer = ensureSkinViewer();
  if (viewer) {
    updateSkinViewerSize();
    viewer.loadSkin(skin.dataUrl, { model: skin.variant === "slim" ? "slim" : "default" });
    viewer.nameTag = null;
  }
  resetSkinCamera();
  const account = accounts.find((item) => item.id === activeAccountId);
  skinChangeButton.disabled = !isMinecraftAccount(account);
  skinRemoveButton.disabled = !isMinecraftAccount(account);
}

function renderSkins() {
  disposeSkinThumbViewers();
  skinGrid.innerHTML = "";
  const account = accounts.find((item) => item.id === activeAccountId);
  if (!activeAccountId || !isMinecraftAccount(account)) {
    setSkinPreview(null);
    return;
  }
  if (!selectedSkinId && activeSkinId) selectedSkinId = activeSkinId;

  if (skins.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-accounts";
    empty.textContent = "No saved skins yet.";
    skinGrid.append(empty);
    setSkinPreview(null);
    return;
  }

  for (const skin of skins) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `skin-card${skin.id === selectedSkinId ? " selected" : ""}`;
    card.addEventListener("click", () => {
      selectedSkinId = skin.id;
      setSkinPreview(skin);
      renderSkins();
    });

    const thumb = document.createElement("span");
    thumb.className = "skin-thumb";
    const thumbCanvas = document.createElement("canvas");
    thumbCanvas.className = "skin-thumb-webgl";
    thumbCanvas.width = 190;
    thumbCanvas.height = 210;
    thumbCanvas.setAttribute("aria-label", skin.name);
    thumb.append(thumbCanvas);
    const thumbViewer = createSkinThumbViewer(thumbCanvas, skin);
    if (!thumbViewer) {
      const thumbModel = createSkinModel(skin.dataUrl, "skin-model-thumb");
      thumbModel.setAttribute("aria-label", skin.name);
      thumb.replaceChildren(thumbModel);
    } else {
      thumb.addEventListener("pointerenter", () => {
        thumbViewer.animation = new window.skinview3d.WalkingAnimation();
        thumbViewer.animation.speed = 0.9;
        thumbViewer.renderPaused = false;
        animateSkinThumb(thumbViewer, -12, 168, 720);
      });
      thumb.addEventListener("pointerleave", () => {
        animateSkinThumb(thumbViewer, 168, -12, 520, () => {
          thumbViewer.animation = null;
          thumbViewer.renderPaused = true;
          thumbViewer.render();
        });
      });
    }

    const title = document.createElement("strong");
    title.textContent = skin.name;
    const meta = document.createElement("small");
    meta.textContent = skin.id === activeSkinId ? "Active skin" : skin.variant || "classic";

    card.append(thumb, title, meta);
    skinGrid.append(card);
  }

  setSkinPreview(selectedSkin());
}

function updateSkinRotation() {
  skinModel.style.setProperty("--skin-rot-x", `${skinRotationX}deg`);
  skinModel.style.setProperty("--skin-rot-y", `${skinRotationY}deg`);
  if (skinViewer) {
    skinViewer.playerWrapper.rotation.y = degreesToRadians(skinRotationY);
    skinViewer.playerWrapper.rotation.x = degreesToRadians(Math.max(-8, Math.min(8, skinRotationX * 0.25)));
    skinViewer.render();
  }
}

async function handleSkinFile(file) {
  if (!file) return;
  if (file.type !== "image/png") {
    skinStatus.textContent = "Upload a PNG Minecraft skin.";
    return;
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  skinStatus.textContent = "Saving skin...";
  const data = await window.dreame.saveSkin({
    name: file.name.replace(/\.png$/i, ""),
    dataUrl,
    variant: "classic"
  });
  skins = data.skins || [];
  activeSkinId = data.activeSkinId || null;
  activeSkinByAccount = data.activeSkinByAccount || activeSkinByAccount;
  selectedSkinId = activeSkinId;
  renderSkins();
  skinStatus.textContent = "Skin saved. Click Change to use it.";
}

async function refreshProfileSkinForAccount(account) {
  if (!isMinecraftAccount(account)) {
    if (!skinView.hidden && account?.type === "offline") {
      skinStatus.textContent = "You need a Minecraft Java account to use skins. The selected account is offline.";
    }
    return;
  }
  if (refreshedProfileSkinAccounts.has(account.id)) return;
  refreshedProfileSkinAccounts.add(account.id);

  try {
    if (!skinView.hidden) skinStatus.textContent = "Loading your current Minecraft skin...";
    const data = await window.dreame.refreshProfileSkin();
    skins = data.skins || skins;
    activeSkinId = data.activeSkinId || activeSkinId;
    activeSkinByAccount = data.activeSkinByAccount || activeSkinByAccount;
    selectedSkinId = activeSkinId;
    renderSkins();
    if (!skinView.hidden) skinStatus.textContent = data.message || "Loaded your current Minecraft skin.";
  } catch (error) {
    refreshedProfileSkinAccounts.delete(account.id);
    if (!skinView.hidden) skinStatus.textContent = error.message;
  }
}

function exploreTypeLabel(type) {
  return {
    modpacks: tr("explore.modpacks"),
    mods: tr("explore.mods"),
    resourcepacks: tr("explore.resourcepacks"),
    datapacks: tr("explore.datapacks"),
    shaders: tr("explore.shaders"),
    servers: tr("explore.servers")
  }[type] || tr("nav.explore");
}

function modrinthProjectType(type) {
  return {
    modpacks: "modpack",
    mods: "mod",
    resourcepacks: "resourcepack",
    datapacks: "datapack",
    shaders: "shader",
    servers: "server"
  }[type] || type;
}

function formatCompactNumber(value) {
  return Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(value || 0);
}

function formatRelativeTime(value) {
  const time = new Date(value || 0).getTime();
  if (!time) return "recently";
  const seconds = Math.max(1, Math.floor((Date.now() - time) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 8) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
  return new Date(value).toLocaleDateString();
}

function renderExploreResults() {
  exploreResults.innerHTML = "";
  if (exploreItems.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-accounts";
    empty.textContent = activeExploreType === "servers" ? tr("explore.noServers") : tr("explore.noResults");
    exploreResults.append(empty);
    return;
  }

  for (const item of exploreItems) {
    const card = document.createElement("article");
    card.className = "explore-card";

    const icon = document.createElement("span");
    icon.className = "explore-icon";
    if (item.iconUrl) icon.style.backgroundImage = `url("${item.iconUrl}")`;
    else icon.textContent = item.title.slice(0, 2).toUpperCase();

    const body = document.createElement("div");
    body.className = "explore-body";
    const title = document.createElement("strong");
    title.textContent = item.title;
    const meta = document.createElement("small");
    meta.textContent = `${item.author || "Unknown"} · ${formatCompactNumber(item.downloads)} downloads · ${item.versions?.slice(-1)[0] || "any version"}`;
    const description = document.createElement("p");
    if (activeExploreType === "servers") {
      const players = item.downloads ? `${formatCompactNumber(item.downloads)} online` : "public server";
      const capacity = item.follows ? ` / ${formatCompactNumber(item.follows)} max` : "";
      meta.textContent = `${item.address || item.slug} - ${players}${capacity} - ${item.versions?.join(", ") || "any version"}`;
    }
    description.textContent = item.description || "";
    const tags = document.createElement("div");
    tags.className = "explore-tags";
    for (const category of (item.categories || []).slice(0, 4)) {
      const tag = document.createElement("span");
      tag.textContent = category;
      tags.append(tag);
    }
    body.append(title, meta, description, tags);

    const action = document.createElement("button");
    action.className = "mini-button";
    action.textContent = activeExploreType === "servers" ? tr("common.play") : tr("common.install");
    action.addEventListener("click", () => openModrinthInstallModal(item));

    card.append(icon, body, action);
    exploreResults.append(card);
  }
}

function modrinthVersionOptionLabel(version) {
  if (!version) return "Choose a version";
  const versionName = version.versionNumber || version.name || "Version";
  const gameText = version.gameVersions?.length ? ` for ${version.gameVersions.join(", ")}` : "";
  const loaderText = version.loaders?.length ? ` - ${version.loaders.join(", ")}` : "";
  return `${versionName}${gameText}${loaderText}`;
}

function loaderCompatibleWithInstance(loaders = [], instance, projectType = activeExploreType) {
  if (!loaders.length) return true;
  if (["resourcepacks", "datapacks", "shaders"].includes(projectType)) return true;
  const wanted = String(instance.loader || "vanilla").toLowerCase();
  const normalized = loaders.map((loader) => String(loader).toLowerCase());
  return normalized.includes(wanted) || normalized.includes("minecraft");
}

function versionCompatibleWithInstance(version, instance, projectType = activeExploreType) {
  const gameVersions = version.gameVersions || [];
  const gameMatches = gameVersions.length === 0 || gameVersions.includes(instance.gameVersion);
  return gameMatches && loaderCompatibleWithInstance(version.loaders || [], instance, projectType);
}

function getCompatibleInstances(projectType = activeExploreType) {
  if (["modpacks", "servers"].includes(projectType)) return instances;
  return instances.filter((instance) => pendingModrinthVersions.some((version) => (
    versionCompatibleWithInstance(version, instance, projectType)
  )));
}

function setSelectedModrinthVersion(versionId) {
  selectedModrinthVersionId = versionId || "";
  const selectedVersion = pendingModrinthVersions.find((version) => version.id === selectedModrinthVersionId);
  modrinthVersionLabel.textContent = selectedVersion
    ? modrinthVersionOptionLabel(selectedVersion)
    : "No versions available";
  modrinthVersionMenu.querySelectorAll(".version-picker-option").forEach((option) => {
    option.classList.toggle("selected", option.dataset.versionId === selectedModrinthVersionId);
  });
}

function renderModrinthVersionMenu() {
  modrinthVersionMenu.innerHTML = "";
  const query = modrinthVersionSearch.value.trim().toLowerCase();
  const versions = query
    ? pendingModrinthVersions.filter((version) => modrinthVersionOptionLabel(version).toLowerCase().includes(query))
    : pendingModrinthVersions;

  if (versions.length === 0) {
    modrinthVersionButton.disabled = true;
    if (pendingModrinthVersions.length === 0) setSelectedModrinthVersion("");
    else {
      selectedModrinthVersionId = "";
      modrinthVersionLabel.textContent = "No matching versions";
    }
    return;
  }

  modrinthVersionButton.disabled = false;
  for (const version of versions) {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "version-picker-option";
    option.dataset.versionId = version.id;
    option.textContent = modrinthVersionOptionLabel(version);
    option.addEventListener("click", () => {
      setSelectedModrinthVersion(version.id);
      modrinthVersionMenu.hidden = true;
    });
    modrinthVersionMenu.append(option);
  }
  if (!versions.some((version) => version.id === selectedModrinthVersionId)) {
    setSelectedModrinthVersion(versions[0].id);
  } else {
    setSelectedModrinthVersion(selectedModrinthVersionId);
  }
}

function buildExplorePages(currentPage, totalPages) {
  const pages = new Set([1, currentPage, currentPage + 1, totalPages]);
  if (currentPage > 1) pages.add(currentPage - 1);
  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

function renderExplorePagination() {
  explorePagination.innerHTML = "";
  const totalPages = Math.ceil(exploreTotalHits / exploreLimit);
  if (totalPages <= 1) return;

  const currentPage = Math.floor(exploreOffset / exploreLimit) + 1;
  const pages = buildExplorePages(currentPage, totalPages);
  let previousPage = 0;

  for (const page of pages) {
    if (previousPage && page - previousPage > 1) {
      const dots = document.createElement("span");
      dots.className = "pagination-dots";
      dots.textContent = "...";
      explorePagination.append(dots);
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "page-button";
    button.textContent = String(page);
    button.classList.toggle("active", page === currentPage);
    button.addEventListener("click", () => {
      if (page === currentPage) return;
      exploreOffset = (page - 1) * exploreLimit;
      searchExplore();
    });
    explorePagination.append(button);
    previousPage = page;
  }

  const next = document.createElement("button");
  next.type = "button";
  next.className = "page-button page-next";
  next.textContent = ">";
  next.disabled = currentPage >= totalPages;
  next.addEventListener("click", () => {
    if (currentPage >= totalPages) return;
    exploreOffset = currentPage * exploreLimit;
    searchExplore();
  });
  explorePagination.append(next);
}

async function searchExplore({ resetPage = false } = {}) {
  try {
    if (resetPage) exploreOffset = 0;
    exploreStatus.textContent = activeExploreType === "servers"
      ? tr("explore.searchingServers")
      : trf("explore.searchingModrinth", { type: exploreTypeLabel(activeExploreType) });
    const result = await window.dreame.searchModrinth({
      type: activeExploreType,
      query: exploreSearch.value.trim(),
      offset: exploreOffset
    });
    exploreItems = result.hits || [];
    exploreTotalHits = result.totalHits || 0;
    exploreOffset = result.offset || 0;
    const start = exploreTotalHits === 0 ? 0 : exploreOffset + 1;
    const end = Math.min(exploreOffset + exploreItems.length, exploreTotalHits);
    exploreStatus.textContent = trf("explore.showing", {
      start,
      end,
      total: exploreTotalHits,
      type: exploreTypeLabel(activeExploreType).toLowerCase()
    });
    if (activeExploreType === "servers") {
      exploreStatus.textContent = trf("explore.showingServers", { start, end, total: exploreTotalHits });
    }
    renderExploreResults();
    renderExplorePagination();
  } catch (error) {
    exploreItems = [];
    exploreTotalHits = 0;
    exploreStatus.textContent = error.message;
    renderExploreResults();
    renderExplorePagination();
  }
}

function closeModrinthModal() {
  pendingModrinthProject = null;
  pendingModrinthVersions = [];
  selectedModrinthVersionId = "";
  modrinthCompatibleInstances = [];
  modrinthVersionMenu.hidden = true;
  resetModrinthInstallProgress();
  modrinthInstallModal.hidden = true;
}

function setModalProgress(panel, fill, label, percentLabel, percent, message) {
  const value = Math.max(1, Math.min(100, Math.round(percent || 1)));
  panel.hidden = false;
  fill.style.width = `${value}%`;
  label.textContent = message || "Working...";
  percentLabel.textContent = `${value}%`;
}

function resetInstanceCreateProgress() {
  instanceCreateProgress.hidden = true;
  instanceCreateProgressFill.style.width = "0";
  instanceCreateProgressLabel.textContent = "Preparing instance...";
  instanceCreateProgressPercent.textContent = "1%";
}

function resetModrinthInstallProgress() {
  modrinthInstallProgress.hidden = true;
  modrinthInstallProgressFill.style.width = "0";
  modrinthInstallProgressLabel.textContent = "Installing...";
  modrinthInstallProgressPercent.textContent = "1%";
}

function setInstanceFormBusy(busy) {
  instanceForm.querySelectorAll("input, select, button").forEach((control) => {
    control.disabled = busy;
  });
}

function fillInstanceSelect(items = instances) {
  modrinthInstanceSelect.innerHTML = items
    .map((instance) => `<option value="${instance.id}">${instance.name} · ${instanceLoaderLabel(instance.loader)} ${instance.gameVersion}</option>`)
    .join("");
}

async function openModrinthInstallModal(project) {
  pendingModrinthProject = project;
  pendingModrinthVersions = [];
  selectedModrinthVersionId = "";
  modrinthCompatibleInstances = [];
  modrinthInstallTitle.textContent = activeExploreType === "servers" ? "Play Server" : `Install ${project.title}`;
  if (activeExploreType === "servers") {
    modrinthInstallSummary.textContent = "Choose an instance to launch, then Dreame will ask Minecraft to join the server address.";
  } else if (activeExploreType === "modpacks") {
    modrinthInstallSummary.textContent = "Choose the modpack version to install.";
  } else {
    modrinthInstallSummary.textContent = "Choose a compatible instance. Dreame will install the right version automatically.";
  }
  modrinthVersionWrap.hidden = activeExploreType !== "modpacks";
  modrinthVersionSearch.value = "";
  modrinthVersionLabel.textContent = "Loading versions...";
  modrinthVersionButton.disabled = true;
  modrinthVersionMenu.innerHTML = "";
  modrinthVersionMenu.hidden = true;
  fillInstanceSelect();
  modrinthInstanceWrap.hidden = activeExploreType === "modpacks";
  resetModrinthInstallProgress();
  confirmModrinthInstall.textContent = activeExploreType === "servers" ? "Play" : "Install";
  confirmModrinthInstall.disabled = false;
  modrinthInstallModal.hidden = false;

  try {
    if (activeExploreType === "servers") return;

    pendingModrinthVersions = await window.dreame.listModrinthVersions(project.projectId);
    if (activeExploreType === "modpacks") {
      renderModrinthVersionMenu();
      setSelectedModrinthVersion(pendingModrinthVersions[0]?.id || "");
      return;
    }

    modrinthCompatibleInstances = getCompatibleInstances(activeExploreType);
    fillInstanceSelect(modrinthCompatibleInstances);
    confirmModrinthInstall.disabled = modrinthCompatibleInstances.length === 0;
    if (modrinthCompatibleInstances.length === 0) {
      modrinthInstallSummary.textContent = "No instances match this project's available Minecraft versions/loaders.";
    }
  } catch (error) {
    pendingModrinthVersions = [];
    renderModrinthVersionMenu();
    modrinthInstallSummary.textContent = error.message;
    if (activeExploreType !== "servers") {
      confirmModrinthInstall.disabled = true;
    }
  }
}

function selectSegment(container, value, attr) {
  container.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("selected", button.dataset[attr] === value);
  });
}

function setIconPreview(iconPath) {
  draftIconPath = iconPath || "";
  if (!draftIconPath) {
    instanceIconPreview.style.backgroundImage = "";
    instanceIconPreview.textContent = "□";
    return;
  }

  instanceIconPreview.textContent = "";
  instanceIconPreview.style.backgroundImage = `url("${draftIconPath.replaceAll("\\", "/")}")`;
}

function instanceLoaderLabel(loader) {
  return {
    vanilla: "Vanilla",
    fabric: "Fabric",
    neoforge: "NeoForge",
    forge: "Forge",
    quilt: "Quilt"
  }[loader] || loader;
}

function openInstanceModal(instance) {
  editingInstanceId = instance?.id || null;
  setInstanceFormBusy(false);
  resetInstanceCreateProgress();
  instanceModalTitle.textContent = instance ? "Configure instance" : "Create instance";
  instanceForm.querySelector("button[type='submit']").textContent = instance ? "Save instance" : "Create instance";
  instanceName.value = instance?.name || "";
  selectedLoader = instance?.loader || "vanilla";
  selectedLoaderVersionType = instance?.loaderVersionType || "stable";
  customLoaderVersion.value = instance?.loaderVersion || "";
  customLoaderVersionWrap.hidden = selectedLoaderVersionType !== "other";
  setIconPreview(instance?.iconPath || "");
  selectSegment(loaderOptions, selectedLoader, "loader");
  selectSegment(loaderVersionOptions, selectedLoaderVersionType, "loaderVersion");
  gameVersion.value = instance?.gameVersion || minecraftVersions[0]?.id || "latest-release";
  instanceModal.hidden = false;
}

function closeModal() {
  setInstanceFormBusy(false);
  resetInstanceCreateProgress();
  instanceModal.hidden = true;
  editingInstanceId = null;
}

function openOfflineAccountModal() {
  offlineAccountName.value = "DreamePlayer";
  offlineAccountModal.hidden = false;
  offlineAccountName.focus();
  offlineAccountName.select();
}

function closeOfflineModal() {
  offlineAccountModal.hidden = true;
}

function openDeleteInstanceModal(instance) {
  pendingDeleteInstanceId = instance.id;
  deleteInstanceMessage.textContent = `Are you sure you want to delete "${instance.name}"?`;
  deleteInstanceModal.hidden = false;
  cancelDeleteInstance.focus();
}

function closeDeleteModal() {
  pendingDeleteInstanceId = null;
  deleteInstanceModal.hidden = true;
}

function renderInstances() {
  instancesGrid.innerHTML = "";

  if (instances.length === 0) {
    const empty = document.createElement("article");
    empty.className = "empty-instance";
    empty.innerHTML = "<h3>No instances yet</h3><p>Create a vanilla, Fabric, Forge, NeoForge, or Quilt profile to start building your setup.</p>";
    instancesGrid.append(empty);
    instanceDetail.innerHTML = "<p class='empty-accounts'>Create an instance to configure files, Java, memory, and folders.</p>";
    return;
  }

  for (const instance of instances) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `instance-card${instance.id === selectedInstanceId ? " selected" : ""}`;
    card.addEventListener("click", () => {
      selectedInstanceId = instance.id;
      renderInstances();
      renderInstanceDetail(instance);
    });

    const icon = document.createElement("span");
    icon.className = "instance-card-icon";
    if (instance.iconPath) icon.style.backgroundImage = `url("${instance.iconPath.replaceAll("\\", "/")}")`;
    else icon.textContent = "□";

    const name = document.createElement("strong");
    name.textContent = instance.name;

    const meta = document.createElement("small");
    meta.textContent = `${instanceLoaderLabel(instance.loader)} · ${instance.gameVersion}`;

    card.append(icon, name, meta);
    instancesGrid.append(card);
  }

  const selected = instances.find((item) => item.id === selectedInstanceId) || instances[0];
  selectedInstanceId = selected.id;
  renderInstanceDetail(selected);
}

function renderInstanceDetail(instance) {
  if (debugPollTimer) {
    window.clearInterval(debugPollTimer);
    debugPollTimer = null;
  }
  if (launchStatePollTimer) {
    window.clearInterval(launchStatePollTimer);
    launchStatePollTimer = null;
  }

  instanceDetail.innerHTML = `
    <div class="detail-head">
      <div class="instance-card-icon large"></div>
      <div>
        <h3>${instance.name}</h3>
        <p>${instanceLoaderLabel(instance.loader)} · ${instance.gameVersion}</p>
      </div>
    </div>

    <div class="detail-actions">
      <button class="play-button detail-play" data-action="play"><span class="play-icon"></span>Play</button>
      <button class="mini-button" data-action="configure">Configure</button>
      <button class="mini-button ghost" data-action="open-root">Open Folder</button>
      <button class="mini-button ghost" data-action="remove">Delete</button>
    </div>

    <div id="launchProgressPanel" class="launch-progress-panel" hidden>
      <div class="launch-progress-copy">
        <strong id="launchProgressLabel">Preparing launch</strong>
        <span id="launchProgressPercent">0%</span>
      </div>
      <div class="launch-progress-track">
        <span id="launchProgressFill"></span>
      </div>
    </div>

    <div class="config-grid">
      <label>RAM <input id="detailRam" type="range" min="1024" max="32768" step="512" value="${instance.ramMb}" /></label>
      <strong id="detailRamValue">${Math.round(instance.ramMb / 1024)} GB</strong>
      <label>Java version <select id="detailJavaVersion">${Array.from({ length: 18 }, (_, index) => index + 8).map((version) => `<option ${version === instance.javaVersion ? "selected" : ""}>${version}</option>`).join("")}</select></label>
      <label>Java executable <input id="detailJavaPath" value="${instance.javaPath || ""}" placeholder="Auto-detect or choose java.exe" /></label>
      <button class="secondary-button" data-action="auto-java">Auto-detect Java</button>
      <button class="secondary-button" data-action="choose-java">Choose Java</button>
      <label>Resolution <input id="detailResolution" value="${instance.resolution}" /></label>
      <label class="checkbox-row"><input id="detailFullscreen" type="checkbox" ${instance.fullscreen ? "checked" : ""} /> Fullscreen</label>
      <label class="wide">Extra JVM args <input id="detailJvmArgs" value="${instance.extraJvmArgs || ""}" placeholder="-XX:+UseG1GC" /></label>
    </div>

    <div class="instance-tabs">
      <button class="selected" data-instance-tab="content">Content</button>
      <button data-instance-tab="files">Files</button>
      <button data-instance-tab="worlds">Worlds</button>
      <button data-instance-tab="logs">Logs</button>
      <button data-instance-tab="debug">Debug</button>
    </div>

    <div class="content-toolbar">
      <input id="instanceSearch" placeholder="Search files..." />
      <button class="mini-button" data-action="upload">Upload files</button>
      <button class="mini-button ghost" data-action="refresh">Refresh</button>
    </div>

    <div id="contentFilters" class="segmented compact">
      <button class="selected" data-content-filter="all">All</button>
      <button data-content-filter="mods">Mods</button>
      <button data-content-filter="resourcepacks">Resource Packs</button>
      <button data-content-filter="shaderpacks">Shaders</button>
      <button data-content-filter="datapacks">Data Packs</button>
      <button data-content-filter="config">Configs</button>
    </div>

    <div id="fileFolderFilters" class="segmented compact" hidden>
      ${["mods", "config", "resourcepacks", "shaderpacks", "datapacks", "saves", "logs", "debug", "crash-reports"].map((folder) => `<button ${folder === activeFileFolder ? "class='selected'" : ""} data-file-folder="${folder}">${folder}</button>`).join("")}
    </div>

    <div id="instanceDropZone" class="instance-drop-zone">
      <strong>Drop files or folders here</strong>
      <span>They will be copied into the selected section of this instance.</span>
    </div>

    <pre id="liveDebugLog" class="live-debug-log" hidden>Debug output will appear here when you launch this instance.</pre>

    <div class="file-table">
      <div class="file-table-head">
        <span>Project / File</span>
        <span>Location</span>
        <span>Actions</span>
      </div>
      <div id="instanceFileRows"></div>
    </div>
  `;

  const largeIcon = instanceDetail.querySelector(".instance-card-icon.large");
  if (instance.iconPath) largeIcon.style.backgroundImage = `url("${instance.iconPath.replaceAll("\\", "/")}")`;
  else largeIcon.textContent = "□";
  renderLaunchProgress(instance.id);

  instanceDetail.querySelector("[data-action='play']").addEventListener("click", async () => {
    const playButton = instanceDetail.querySelector("[data-action='play']");
    try {
      const state = await window.dreame.getLaunchState(instance.id);
      if (state.running) {
        setPlayButtonState(playButton, "stopping");
        await window.dreame.stopInstance(instance.id);
        authStatus.textContent = `Stopping ${instance.name}...`;
        startLaunchStatePolling(instance);
        return;
      }

      setPlayButtonState(playButton, "launching");
      setLaunchProgress(instance.id, 1, `Launching ${instance.name}`);
      await showLaunchDebug(instance);
      const launch = await window.dreame.launchInstance(instance.id);
      authStatus.textContent = `Launching ${instance.name}. Debug log: ${launch.debugLog}`;
      setPlayButtonState(playButton, "running");
      startLaunchStatePolling(instance);
      await loadAndRenderInstanceFiles(instance);
    } catch (error) {
      authStatus.textContent = error.message;
      setPlayButtonState(playButton, "idle");
      showLaunchFailure(instance.id, error.message);
      await loadAndRenderInstanceFiles(instance);
    }
  });

  instanceDetail.querySelector("[data-action='configure']").addEventListener("click", () => openInstanceModal(instance));
  instanceDetail.querySelector("[data-action='open-root']").addEventListener("click", () => window.dreame.openInstanceFolder(instance.id));
  instanceDetail.querySelector("[data-action='remove']").addEventListener("click", () => {
    openDeleteInstanceModal(instance);
  });
  instanceDetail.querySelector("[data-action='choose-java']").addEventListener("click", async () => {
    const javaPath = await window.dreame.chooseJava();
    if (javaPath) {
      instance.javaPath = javaPath;
      await saveDetailConfig(instance);
      renderInstanceDetail(instance);
    }
  });
  instanceDetail.querySelector("[data-action='auto-java']").addEventListener("click", async () => {
    const desired = Number(instanceDetail.querySelector("#detailJavaVersion").value);
    const installs = await window.dreame.listJavaInstallations();
    const picked = installs.find((item) => item.major === desired) || installs[0];
    if (!picked) {
      authStatus.textContent = "No Java installations found. Install Java or use Choose Java.";
      return;
    }

    instance.javaPath = picked.path;
    instanceDetail.querySelector("#detailJavaPath").value = picked.path;
    await saveDetailConfig(instance);
    authStatus.textContent = `Using Java ${picked.major || ""}: ${picked.path}`;
  });
  instanceDetail.querySelector("[data-action='upload']").addEventListener("click", async () => {
    await window.dreame.chooseImportFiles(instance.id, getCurrentTargetFolder());
    await loadAndRenderInstanceFiles(instance);
  });
  instanceDetail.querySelector("[data-action='refresh']").addEventListener("click", () => loadAndRenderInstanceFiles(instance));

  const detailRam = instanceDetail.querySelector("#detailRam");
  const detailRamValue = instanceDetail.querySelector("#detailRamValue");
  detailRam.addEventListener("input", () => { detailRamValue.textContent = `${Math.round(Number(detailRam.value) / 1024)} GB`; });
  ["change", "blur"].forEach((eventName) => {
    instanceDetail.querySelectorAll("#detailRam, #detailJavaVersion, #detailJavaPath, #detailResolution, #detailFullscreen, #detailJvmArgs").forEach((input) => {
      input.addEventListener(eventName, () => saveDetailConfig(instance));
    });
  });

  instanceDetail.querySelectorAll("[data-instance-tab]").forEach((button) => {
    button.addEventListener("click", async () => {
      activeInstanceTab = button.dataset.instanceTab;
      if (activeInstanceTab === "worlds") activeFileFolder = "saves";
      if (activeInstanceTab === "logs") activeFileFolder = "logs";
      if (activeInstanceTab === "debug") activeFileFolder = "debug";
      await loadAndRenderInstanceFiles(instance);
      if (activeInstanceTab === "debug") startDebugPolling(instance);
    });
  });

  instanceDetail.querySelectorAll("[data-content-filter]").forEach((button) => {
    button.addEventListener("click", async () => {
      activeContentFilter = button.dataset.contentFilter;
      await loadAndRenderInstanceFiles(instance);
    });
  });

  instanceDetail.querySelectorAll("[data-file-folder]").forEach((button) => {
    button.addEventListener("click", async () => {
      activeFileFolder = button.dataset.fileFolder;
      await loadAndRenderInstanceFiles(instance);
    });
  });

  instanceDetail.querySelector("#instanceSearch").addEventListener("input", () => renderFileRows(instance));

  const dropZone = instanceDetail.querySelector("#instanceDropZone");
  [dropZone, instanceDetail].forEach((target) => {
    target.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropZone.classList.add("dragging");
    });
    target.addEventListener("dragleave", () => dropZone.classList.remove("dragging"));
    target.addEventListener("drop", async (event) => {
      event.preventDefault();
      dropZone.classList.remove("dragging");
      const filePaths = Array.from(event.dataTransfer.files).map((file) => file.path).filter(Boolean);
      if (filePaths.length) {
        await window.dreame.importFilesToInstance(instance.id, filePaths, getCurrentTargetFolder());
        await loadAndRenderInstanceFiles(instance);
      }
    });
  });

  loadAndRenderInstanceFiles(instance);
  startLaunchStatePolling(instance);
}

function getCurrentTargetFolder() {
  if (activeInstanceTab === "worlds") return "saves";
  if (activeInstanceTab === "logs") return "logs";
  if (activeInstanceTab === "debug") return "debug";
  if (activeInstanceTab === "files") {
    const selected = instanceDetail.querySelector("[data-file-folder].selected");
    return selected?.dataset.fileFolder || activeFileFolder;
  }
  if (activeInstanceTab === "content") {
    const selected = instanceDetail.querySelector("[data-content-filter].selected");
    const value = selected?.dataset.contentFilter || activeContentFilter;
    return value === "all" ? "" : value;
  }
  return "mods";
}

function getActiveFileFilter() {
  if (activeInstanceTab === "content") return activeContentFilter;
  if (activeInstanceTab === "files") return activeFileFolder;
  if (activeInstanceTab === "worlds") return "saves";
  if (activeInstanceTab === "logs") return "logs";
  if (activeInstanceTab === "debug") return "debug";
  return "all";
}

function getFoldersForActiveTab() {
  if (activeInstanceTab === "content") {
    if (activeContentFilter && activeContentFilter !== "all") return [activeContentFilter];
    return ["mods", "resourcepacks", "shaderpacks", "datapacks", "config"];
  }
  if (activeInstanceTab === "worlds") return ["saves"];
  if (activeInstanceTab === "logs") return ["logs"];
  if (activeInstanceTab === "debug") return ["debug"];
  return [activeFileFolder];
}

async function showLaunchDebug(instance) {
  activeInstanceTab = "debug";
  activeFileFolder = "debug";
  setLaunchProgress(instance.id, 1, `Launching ${instance.name}`);
  await loadAndRenderInstanceFiles(instance);
  const liveDebugLog = instanceDetail.querySelector("#liveDebugLog");
  if (liveDebugLog) {
    liveDebugLog.hidden = false;
    liveDebugLog.textContent = "Starting launch...";
  }
  startDebugPolling(instance);
}

function setLaunchProgress(instanceId, percent, message) {
  launchProgressByInstance.set(instanceId, {
    percent: Math.max(0, Math.min(100, Math.round(Number(percent) || 0))),
    message: message || "Preparing launch"
  });
  if (selectedInstanceId === instanceId) renderLaunchProgress(instanceId);
}

function clearLaunchProgress(instanceId) {
  launchProgressByInstance.delete(instanceId);
  if (selectedInstanceId === instanceId) renderLaunchProgress(instanceId);
}

function showLaunchFailure(instanceId, message) {
  launchProgressByInstance.set(instanceId, {
    percent: 0,
    message: message || "Launch failed",
    failed: true
  });
  if (selectedInstanceId === instanceId) renderLaunchProgress(instanceId);
  window.setTimeout(() => {
    if (!launchProgressByInstance.get(instanceId)?.failed) return;
    clearLaunchProgress(instanceId);
  }, 7000);
}

function renderLaunchProgress(instanceId) {
  const panel = instanceDetail.querySelector("#launchProgressPanel");
  if (!panel) return;
  const progress = launchProgressByInstance.get(instanceId);
  panel.hidden = !progress;
  if (!progress) return;
  panel.classList.toggle("failed", Boolean(progress.failed));

  const fill = panel.querySelector("#launchProgressFill");
  const label = panel.querySelector("#launchProgressLabel");
  const percent = panel.querySelector("#launchProgressPercent");
  fill.style.width = `${progress.percent}%`;
  label.textContent = progress.message;
  percent.textContent = `${progress.percent}%`;
}

async function loadAndRenderInstanceFiles(instance) {
  const folders = getFoldersForActiveTab();
  const lists = await Promise.all(folders.map(async (folder) => {
    const entries = await window.dreame.listInstanceFiles(instance.id, folder);
    return entries.map((entry) => ({ ...entry, folder }));
  }));
  instanceFiles = lists.flat();
  renderFileRows(instance);
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function createFileIcon(entry) {
  const icon = document.createElement("span");
  icon.className = "file-icon";
  const iconData = entry.icon || {};

  if (iconData.kind === "image" && iconData.dataUrl) {
    icon.classList.add("image");
    const image = document.createElement("img");
    image.alt = "";
    image.src = iconData.dataUrl;
    icon.append(image);
    return icon;
  }

  if (entry.type === "folder") {
    icon.classList.add("folder");
    icon.textContent = "DIR";
    return icon;
  }

  icon.textContent = iconData.label || "FILE";
  return icon;
}

function renderFileRows(instance) {
  const tabs = instanceDetail.querySelectorAll("[data-instance-tab]");
  tabs.forEach((button) => button.classList.toggle("selected", button.dataset.instanceTab === activeInstanceTab));
  const contentFilters = instanceDetail.querySelector("#contentFilters");
  const fileFolderFilters = instanceDetail.querySelector("#fileFolderFilters");
  contentFilters.toggleAttribute("hidden", activeInstanceTab !== "content");
  fileFolderFilters.toggleAttribute("hidden", activeInstanceTab !== "files");

  contentFilters.querySelectorAll("[data-content-filter]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.contentFilter === activeContentFilter);
  });
  fileFolderFilters.querySelectorAll("[data-file-folder]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.fileFolder === activeFileFolder);
  });

  const query = instanceDetail.querySelector("#instanceSearch").value.trim().toLowerCase();
  const rows = instanceDetail.querySelector("#instanceFileRows");
  const liveDebugLog = instanceDetail.querySelector("#liveDebugLog");
  const dropZone = instanceDetail.querySelector("#instanceDropZone");
  const table = instanceDetail.querySelector(".file-table");
  if (liveDebugLog) liveDebugLog.hidden = activeInstanceTab !== "debug";
  if (dropZone) dropZone.hidden = activeInstanceTab === "debug";
  if (table) table.hidden = false;

  let visible = instanceFiles;
  const activeFilter = getActiveFileFilter();
  if (activeFilter && activeFilter !== "all") {
    visible = visible.filter((entry) => entry.folder === activeFilter);
  }
  if (query) {
    visible = visible.filter((entry) => `${entry.name} ${entry.fileName} ${entry.folder}`.toLowerCase().includes(query));
  }

  rows.innerHTML = "";
  if (visible.length === 0) {
    rows.innerHTML = "<div class='empty-file-row'>No files here yet. Drop files/folders or use Upload files.</div>";
    return;
  }

  for (const entry of visible) {
    const row = document.createElement("div");
    row.className = "file-row";

    const name = document.createElement("div");
    name.className = "file-name-cell";
    name.innerHTML = `<span class="file-icon">${entry.type === "folder" ? "□" : "◦"}</span><span><strong>${entry.name}</strong><small>${formatFileSize(entry.size)} · ${new Date(entry.modifiedAt).toLocaleDateString()}</small></span>`;

    name.innerHTML = "";
    const text = document.createElement("span");
    const title = document.createElement("strong");
    title.textContent = entry.name;
    const meta = document.createElement("small");
    meta.textContent = `${formatFileSize(entry.size)} · ${new Date(entry.modifiedAt).toLocaleDateString()}`;
    text.append(title, meta);
    name.append(createFileIcon(entry), text);

    const location = document.createElement("button");
    location.className = "folder-chip";
    location.textContent = entry.folder;
    location.addEventListener("click", () => window.dreame.openInstanceFolder(instance.id, entry.folder));

    const actions = document.createElement("div");
    actions.className = "file-actions";

    if (["mods", "resourcepacks", "shaderpacks"].includes(entry.folder) && entry.type === "file") {
      const toggle = document.createElement("button");
      toggle.className = `toggle-pill${entry.enabled ? " on" : ""}`;
      toggle.textContent = entry.enabled ? "On" : "Off";
      toggle.addEventListener("click", async () => {
        await window.dreame.toggleInstanceFile(instance.id, entry.folder, entry.fileName, !entry.enabled);
        await loadAndRenderInstanceFiles(instance);
      });
      actions.append(toggle);
    }

    const remove = document.createElement("button");
    remove.className = "delete-file";
    remove.textContent = "Delete";
    remove.addEventListener("click", async () => {
      if (!window.confirm(`Delete ${entry.fileName}?`)) return;
      await window.dreame.deleteInstanceFile(instance.id, entry.folder, entry.fileName);
      await loadAndRenderInstanceFiles(instance);
    });
    actions.append(remove);

    row.append(name, location, actions);
    rows.append(row);
  }
}

async function refreshDebugLog(instance) {
  const liveDebugLog = instanceDetail.querySelector("#liveDebugLog");
  if (!liveDebugLog || activeInstanceTab !== "debug") return;
  const text = await window.dreame.readDebugLog(instance.id);
  liveDebugLog.textContent = text || "Waiting for debug output...";
  liveDebugLog.scrollTop = liveDebugLog.scrollHeight;
}

function startDebugPolling(instance) {
  if (debugPollTimer) window.clearInterval(debugPollTimer);
  refreshDebugLog(instance);
  debugPollTimer = window.setInterval(() => refreshDebugLog(instance), 800);
}

function setPlayButtonState(button, state) {
  if (!button) return;
  button.disabled = state === "launching" || state === "stopping";
  button.classList.toggle("stop", state === "running" || state === "stopping");
  button.dataset.running = state === "running" ? "true" : "false";

  if (state === "launching") {
    button.textContent = tr("common.launching");
    return;
  }

  if (state === "stopping") {
    button.textContent = tr("common.stopping");
    return;
  }

  if (state === "running") {
    button.innerHTML = `<span class="stop-icon"></span>${tr("common.stop")}`;
    return;
  }

  button.innerHTML = `<span class="play-icon"></span>${tr("common.play")}`;
}

async function refreshLaunchState(instance) {
  if (!instanceDetail || selectedInstanceId !== instance.id) return;
  const playButton = instanceDetail.querySelector("[data-action='play']");
  if (!playButton) return;
  const state = await window.dreame.getLaunchState(instance.id);
  const isStopping = playButton.textContent === "Stopping...";
  setPlayButtonState(playButton, state.running && isStopping ? "stopping" : state.running ? "running" : "idle");
}

function startLaunchStatePolling(instance) {
  if (launchStatePollTimer) window.clearInterval(launchStatePollTimer);
  refreshLaunchState(instance);
  launchStatePollTimer = window.setInterval(() => refreshLaunchState(instance), 1000);
}

async function saveDetailConfig(instance) {
  const next = {
    ...instance,
    ramMb: Number(instanceDetail.querySelector("#detailRam").value),
    javaVersion: Number(instanceDetail.querySelector("#detailJavaVersion").value),
    javaPath: instanceDetail.querySelector("#detailJavaPath").value,
    resolution: instanceDetail.querySelector("#detailResolution").value,
    fullscreen: instanceDetail.querySelector("#detailFullscreen").checked,
    extraJvmArgs: instanceDetail.querySelector("#detailJvmArgs").value,
    skipPrepare: true
  };

  const saved = await window.dreame.saveInstance(next);
  instances = instances.map((item) => item.id === saved.id ? saved : item);
}

async function loadMinecraftVersions() {
  try {
    const manifest = await window.dreame.listMinecraftVersions();
    minecraftVersions = manifest.versions;
  } catch {
    minecraftVersions = [
      { id: "latest-release", type: "release" },
      { id: "1.21.6", type: "release" },
      { id: "1.20.1", type: "release" },
      { id: "1.12.2", type: "release" },
      { id: "1.8.9", type: "release" },
      { id: "rd-132211", type: "old_alpha" }
    ];
  }

  gameVersion.innerHTML = minecraftVersions
    .map((version) => `<option value="${version.id}">${version.id} ${version.type ? `· ${version.type}` : ""}</option>`)
    .join("");
}

async function hydrate() {
  buildSwatches();
  const state = await window.dreame.getState();
  const settings = state.settings;
  accounts = state.accounts;
  instances = state.instances || [];
  recentServers = state.recentServers || [];
  skins = state.skins?.skins || [];
  activeSkinId = state.skins?.activeSkinId || null;
  activeSkinByAccount = state.skins?.activeSkinByAccount || {};
  selectedSkinId = activeSkinId;
  activeAccountId = settings.activeAccountId;

  dataPath.textContent = state.dataPath;
  launcherVersion.textContent = state.version ? `v${state.version}` : "Unknown";
  applyTheme(settings.theme || "color");
  applyAccent(settings.accent);
  applyLanguage(settings.language || "en");
  setActiveAccount(accounts.find((account) => account.id === settings.activeAccountId));

  await window.dreame.saveSettings(settings);
  await loadMinecraftVersions();
  renderInstances();
  renderRecentServers();
  renderSkins();
  updateSkinRotation();
  checkLauncherUpdate().catch(() => {});
}

accentInput.addEventListener("input", () => {
  applyAccent(accentInput.value);
  queueSave();
});

themeOptions.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.theme);
    queueSave();
  });
});

settingsTabs?.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => showSettingsTab(button.dataset.settingsTab));
});

languageSearch?.addEventListener("input", () => {
  renderLanguageList();
});

openDataFolder.addEventListener("click", () => window.dreame.openDataFolder());

checkUpdateButton.addEventListener("click", async () => {
  await checkLauncherUpdate();
});

installUpdateButton.addEventListener("click", async () => {
  await installLatestLauncherUpdate();
});

updateToastInstall.addEventListener("click", async () => {
  await installLatestLauncherUpdate();
});

updateToastClose.addEventListener("click", () => {
  hideUpdateToast();
});

navItems.forEach((item) => item.addEventListener("click", () => showView(item.dataset.view)));

browseServersButton.addEventListener("click", () => {
  activeExploreType = "servers";
  exploreOffset = 0;
  exploreTabs.querySelectorAll("[data-explore-type]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.exploreType === "servers");
  });
  showView("explore");
  searchExplore();
});

deviceCodeBox.addEventListener("click", async () => {
  const code = deviceCode.textContent.trim();
  if (!code || code === "----") return;
  await window.dreame.copyText(code);
  window.clearTimeout(deviceCodeCopyTimer);
  deviceCodeBox.classList.add("copied");
  deviceCodeCopyHint.textContent = tr("common.copied");
  authStatus.textContent = trf("login.copiedCode", { code });
  deviceCodeCopyTimer = window.setTimeout(() => {
    deviceCodeBox.classList.remove("copied");
    deviceCodeCopyHint.textContent = tr("common.clickToCopy");
  }, 1800);
});

skinUploadButton.addEventListener("click", () => skinFileInput.click());
skinFileInput.addEventListener("change", async () => {
  try {
    await handleSkinFile(skinFileInput.files?.[0]);
  } catch (error) {
    skinStatus.textContent = error.message;
  } finally {
    skinFileInput.value = "";
  }
});

skinStage.addEventListener("pointerdown", (event) => {
  skinStage.setPointerCapture(event.pointerId);
  cancelSkinSpinAnimation();
  skinDragStart = {
    x: event.clientX,
    y: event.clientY,
    rotX: skinRotationX,
    rotY: skinRotationY
  };
});

skinStage.addEventListener("pointermove", (event) => {
  if (!skinDragStart) return;
  skinRotationY = skinDragStart.rotY + (event.clientX - skinDragStart.x) * 0.55;
  skinRotationX = Math.max(-35, Math.min(25, skinDragStart.rotX - (event.clientY - skinDragStart.y) * 0.35));
  updateSkinRotation();
});

skinStage.addEventListener("pointerup", () => {
  skinDragStart = null;
});

skinStage.addEventListener("pointercancel", () => {
  skinDragStart = null;
});

skinStage.addEventListener("pointerenter", () => {
  if (skinDragStart) return;
  const skin = selectedSkin();
  if (!skin) return;
  animateSkinModel(skinRotationY, skinRotationY + 180, 900);
});

skinStage.addEventListener("pointerleave", () => {
  if (skinDragStart) return;
  const skin = selectedSkin();
  if (!skin) return;
  animateSkinModel(skinRotationY, -12, 650, () => {
    skinRotationX = 0;
    skinRotationY = -12;
    updateSkinRotation();
  });
});

skinChangeButton.addEventListener("click", async () => {
  const skin = selectedSkin();
  if (!skin) return;

  try {
    skinChangeButton.disabled = true;
    skinStatus.textContent = "Changing skin...";
    const result = await window.dreame.applySkin(skin.id);
    skins = result.skins || [];
    activeSkinId = result.activeSkinId || skin.id;
    activeSkinByAccount = result.activeSkinByAccount || activeSkinByAccount;
    selectedSkinId = activeSkinId;
    renderSkins();
    skinStatus.textContent = result.message || "Skin changed.";
  } catch (error) {
    skinStatus.textContent = error.message;
  } finally {
    const account = accounts.find((item) => item.id === activeAccountId);
    skinChangeButton.disabled = !isMinecraftAccount(account) || !selectedSkin();
  }
});

skinRemoveButton.addEventListener("click", async () => {
  const skin = selectedSkin();
  if (!skin) return;
  const result = await window.dreame.removeSkin(skin.id);
  skins = result.skins || [];
  activeSkinId = result.activeSkinId || null;
  activeSkinByAccount = result.activeSkinByAccount || activeSkinByAccount;
  selectedSkinId = activeSkinId;
  renderSkins();
  skinStatus.textContent = "Skin removed.";
});

createInstance.addEventListener("click", () => openInstanceModal());
closeInstanceModal.addEventListener("click", closeModal);
backInstanceModal.addEventListener("click", closeModal);
instanceModal.addEventListener("click", (event) => {
  if (event.target === instanceModal) closeModal();
});

selectInstanceIcon.addEventListener("click", async () => setIconPreview(await window.dreame.chooseInstanceIcon()));
removeInstanceIcon.addEventListener("click", () => setIconPreview(""));

loaderOptions.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedLoader = button.dataset.loader;
    selectSegment(loaderOptions, selectedLoader, "loader");
  });
});

loaderVersionOptions.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedLoaderVersionType = button.dataset.loaderVersion;
    customLoaderVersionWrap.hidden = selectedLoaderVersionType !== "other";
    selectSegment(loaderVersionOptions, selectedLoaderVersionType, "loaderVersion");
  });
});

instanceForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const isEditing = Boolean(editingInstanceId);

  try {
    setInstanceFormBusy(true);
    if (!isEditing) {
      setModalProgress(
        instanceCreateProgress,
        instanceCreateProgressFill,
        instanceCreateProgressLabel,
        instanceCreateProgressPercent,
        1,
        "Starting download"
      );
    }

    const saved = await window.dreame.saveInstance({
      id: editingInstanceId,
      name: instanceName.value,
      iconPath: draftIconPath,
      loader: selectedLoader,
      gameVersion: gameVersion.value,
      loaderVersionType: selectedLoaderVersionType,
      loaderVersion: selectedLoaderVersionType === "other" ? customLoaderVersion.value : "",
      skipPrepare: isEditing
    });

    if (instances.some((item) => item.id === saved.id)) {
      instances = instances.map((item) => item.id === saved.id ? saved : item);
    } else {
      instances.push(saved);
    }

    selectedInstanceId = saved.id;
    authStatus.textContent = isEditing ? `${saved.name} saved.` : `${saved.name} downloaded and ready.`;
    closeModal();
    showView("instances");
    renderInstances();
  } catch (error) {
    setInstanceFormBusy(false);
    instanceCreateProgress.hidden = false;
    instanceCreateProgressLabel.textContent = error.message;
    authStatus.textContent = error.message;
  }
});

offlineLogin.addEventListener("click", () => {
  openOfflineAccountModal();
});

closeOfflineAccountModal.addEventListener("click", closeOfflineModal);
cancelOfflineAccount.addEventListener("click", closeOfflineModal);
offlineAccountModal.addEventListener("click", (event) => {
  if (event.target === offlineAccountModal) closeOfflineModal();
});

offlineAccountForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const offlineName = offlineAccountName.value.trim();
    if (!offlineName) return;

    authStatus.textContent = "Creating offline local profile...";
    const account = await window.dreame.createOfflineAccount(offlineName);
    if (!accounts.some((item) => item.id === account.id)) accounts.push(account);
    else accounts = accounts.map((item) => item.id === account.id ? account : item);
    setActiveAccount(account);
    closeOfflineModal();
    authStatus.textContent = `Offline account saved with UUID ${account.uuid}. Works for local play and offline-mode servers only.`;
  } catch (error) {
    authStatus.textContent = error.message;
  }
});

closeDeleteInstanceModal.addEventListener("click", closeDeleteModal);
cancelDeleteInstance.addEventListener("click", closeDeleteModal);
deleteInstanceModal.addEventListener("click", (event) => {
  if (event.target === deleteInstanceModal) closeDeleteModal();
});

confirmDeleteInstance.addEventListener("click", async () => {
  if (!pendingDeleteInstanceId) return;

  try {
    confirmDeleteInstance.disabled = true;
    confirmDeleteInstance.textContent = "Deleting...";
    const result = await window.dreame.removeInstance(pendingDeleteInstanceId);
    instances = result.instances;
    selectedInstanceId = instances[0]?.id || null;
    closeDeleteModal();
    renderInstances();
  } catch (error) {
    authStatus.textContent = error.message;
  } finally {
    confirmDeleteInstance.disabled = false;
    confirmDeleteInstance.textContent = "Yes";
  }
});

exploreTabs.querySelectorAll("[data-explore-type]").forEach((button) => {
  button.addEventListener("click", () => {
    activeExploreType = button.dataset.exploreType;
    exploreTabs.querySelectorAll("[data-explore-type]").forEach((item) => {
      item.classList.toggle("selected", item === button);
    });
    exploreSearch.placeholder = `Search ${exploreTypeLabel(activeExploreType).toLowerCase()}...`;
    searchExplore({ resetPage: true });
  });
});

exploreSearchButton.addEventListener("click", () => searchExplore({ resetPage: true }));
refreshExplore.addEventListener("click", searchExplore);
exploreSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchExplore({ resetPage: true });
});

closeModrinthInstallModal.addEventListener("click", closeModrinthModal);
cancelModrinthInstall.addEventListener("click", closeModrinthModal);
modrinthVersionSearch.addEventListener("input", () => {
  renderModrinthVersionMenu();
  modrinthVersionMenu.hidden = false;
});
modrinthVersionButton.addEventListener("click", () => {
  if (modrinthVersionButton.disabled) return;
  modrinthVersionMenu.hidden = !modrinthVersionMenu.hidden;
});
document.addEventListener("click", (event) => {
  if (modrinthVersionMenu.hidden) return;
  if (modrinthVersionButton.contains(event.target) || modrinthVersionMenu.contains(event.target)) return;
  modrinthVersionMenu.hidden = true;
});
modrinthInstallModal.addEventListener("click", (event) => {
  if (event.target === modrinthInstallModal) closeModrinthModal();
});

confirmModrinthInstall.addEventListener("click", async () => {
  if (!pendingModrinthProject) return;
  const versionId = selectedModrinthVersionId;
  const instanceId = modrinthInstanceSelect.value;

  try {
    if (activeExploreType === "modpacks" && !versionId) {
      throw new Error("Choose a version first.");
    }
    if (activeExploreType !== "modpacks" && !instanceId) {
      throw new Error("Choose a compatible instance first.");
    }
    confirmModrinthInstall.disabled = true;
    confirmModrinthInstall.textContent = activeExploreType === "servers" ? "Launching..." : "Installing...";
    if (activeExploreType !== "servers") {
      setModalProgress(
        modrinthInstallProgress,
        modrinthInstallProgressFill,
        modrinthInstallProgressLabel,
        modrinthInstallProgressPercent,
        1,
        "Starting install"
      );
    }

    if (activeExploreType === "modpacks") {
      const instance = await window.dreame.installModrinthPack(versionId);
      instances = await window.dreame.listInstances();
      selectedInstanceId = instance.id;
      setModalProgress(
        modrinthInstallProgress,
        modrinthInstallProgressFill,
        modrinthInstallProgressLabel,
        modrinthInstallProgressPercent,
        100,
        instance.alreadyInstalled ? "Already installed" : "Done"
      );
      confirmModrinthInstall.textContent = instance.alreadyInstalled ? "Already installed" : "Done";
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      closeModrinthModal();
      showView("instances");
      renderInstances();
      authStatus.textContent = instance.alreadyInstalled
        ? `${instance.name} is already installed.`
        : `${instance.name} installed from Modrinth.`;
      return;
    }

    if (activeExploreType === "servers") {
      const result = await window.dreame.launchModrinthServer({
        instanceId,
        address: pendingModrinthProject.address || pendingModrinthProject.slug,
        title: pendingModrinthProject.title,
        iconUrl: pendingModrinthProject.iconUrl,
        description: pendingModrinthProject.description
      });
      recentServers = result.recentServers || recentServers;
      renderRecentServers();
      closeModrinthModal();
      authStatus.textContent = `Launching server ${pendingModrinthProject.title}.`;
      return;
    }

    const installResult = await window.dreame.installModrinthFile({
      instanceId,
      projectId: pendingModrinthProject.projectId,
      projectType: pendingModrinthProject.projectType || modrinthProjectType(activeExploreType)
    });
    setModalProgress(
      modrinthInstallProgress,
      modrinthInstallProgressFill,
      modrinthInstallProgressLabel,
      modrinthInstallProgressPercent,
      100,
      installResult.alreadyInstalled ? "Already installed" : "Done"
    );
    confirmModrinthInstall.textContent = installResult.alreadyInstalled ? "Already installed" : "Done";
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    closeModrinthModal();
    const instance = instances.find((item) => item.id === instanceId);
    authStatus.textContent = installResult.alreadyInstalled
      ? `${pendingModrinthProject.title} is already installed in ${instance?.name || "the selected instance"}.`
      : `${pendingModrinthProject.title} installed into ${instance?.name || "the selected instance"}.`;
    if (selectedInstanceId === instanceId) {
      await loadAndRenderInstanceFiles(instance);
    }
  } catch (error) {
    modrinthInstallSummary.textContent = error.message;
  } finally {
    confirmModrinthInstall.disabled = false;
    confirmModrinthInstall.textContent = activeExploreType === "servers" ? "Play" : "Install";
  }
});

microsoftLogin.addEventListener("click", async () => {
  try {
    microsoftLogin.disabled = true;
    deviceCodeBox.hidden = true;
    deviceCode.textContent = "----";
    authStatus.textContent = "Opening Microsoft login...";
    const device = await window.dreame.startMicrosoftLogin("");
    deviceCode.textContent = device.userCode;
    deviceCodeBox.hidden = false;
    authStatus.textContent = "Microsoft opened in your browser. Enter this code there, then finish signing in.";

    const account = await window.dreame.finishMicrosoftLogin({
      clientId: device.clientId,
      deviceCode: device.deviceCode,
      interval: device.interval,
      authMode: device.authMode,
      tokenEndpoint: device.tokenEndpoint,
      tokenScope: device.tokenScope
    });

    if (!accounts.some((item) => item.id === account.id)) accounts.push(account);
    else accounts = accounts.map((item) => item.id === account.id ? account : item);
    setActiveAccount(account);
    deviceCodeBox.hidden = true;
    authStatus.textContent = `Signed in as ${account.name}. Minecraft profile verified.`;
  } catch (error) {
    authStatus.textContent = error.message.includes("OAuth client ID")
      ? "Microsoft login needs Dreame Launcher's developer client ID configured first."
      : error.message;
  } finally {
    microsoftLogin.disabled = false;
  }
});

xalLogin.addEventListener("click", async () => {
  try {
    xalLogin.disabled = true;
    deviceCodeBox.hidden = true;
    authStatus.textContent = "Opening Sisu/XAL browser login...";
    await window.dreame.startXalLogin();
    authStatus.textContent = "Sisu/XAL login URL copied. If the page loops, paste it into Edge InPrivate or Chrome Incognito.";

    const redirectUri = window.prompt("After Microsoft finishes login, copy the full redirect URL from the browser and paste it here:");
    if (!redirectUri) {
      authStatus.textContent = "Sisu/XAL login canceled.";
      return;
    }

    authStatus.textContent = "Finishing Sisu/XAL login and checking Minecraft profile...";
    const account = await window.dreame.finishXalLogin(redirectUri);
    if (!accounts.some((item) => item.id === account.id)) accounts.push(account);
    else accounts = accounts.map((item) => item.id === account.id ? account : item);
    setActiveAccount(account);
    authStatus.textContent = `Signed in as ${account.name} through Sisu/XAL. Minecraft profile verified.`;
  } catch (error) {
    authStatus.textContent = error.message;
  } finally {
    xalLogin.disabled = false;
  }
});

if (window.dreame.onLaunchProgress) {
  window.dreame.onLaunchProgress((payload) => {
    if (!payload?.instanceId) return;
    setLaunchProgress(payload.instanceId, payload.percent, payload.message);
  });
}

if (window.dreame.onCreateProgress) {
  window.dreame.onCreateProgress((payload) => {
    setModalProgress(
      instanceCreateProgress,
      instanceCreateProgressFill,
      instanceCreateProgressLabel,
      instanceCreateProgressPercent,
      payload?.percent || 1,
      payload?.message || "Preparing instance"
    );
  });
}

if (window.dreame.onModrinthInstallProgress) {
  window.dreame.onModrinthInstallProgress((payload) => {
    setModalProgress(
      modrinthInstallProgress,
      modrinthInstallProgressFill,
      modrinthInstallProgressLabel,
      modrinthInstallProgressPercent,
      payload?.percent || 1,
      payload?.message || "Installing"
    );
  });
}

if (window.dreame.onUpdateProgress) {
  window.dreame.onUpdateProgress((payload) => {
    setUpdateProgress(payload?.percent || 0, payload?.message || "Downloading update...");
  });
}

if (window.dreame.onRecentServersUpdated) {
  window.dreame.onRecentServersUpdated((servers) => {
    recentServers = Array.isArray(servers) ? servers : recentServers;
    renderRecentServers();
  });
}

hydrate();
