const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const RPC = require("discord-rpc");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 720,
    height: 720,
    resizable: true,
    titleBarStyle: "hidden",
    //autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("close", async () => await rpc.clearActivity());

  mainWindow.on("closed", async () => {
    mainWindow = null;
  });

  mainWindow.webContents.openDevTools({ mode: "detach" });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// don't change the client id if you want this example to work
const clientId = "704484262845481011";

// only needed for discord allowing spectate, join, ask to join
RPC.register(clientId);

const rpc = new RPC.Client({ transport: "ipc" });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !mainWindow) {
    return;
  }

  const fruits = await mainWindow.webContents.executeJavaScript("window.score");
  const fruits_two = await mainWindow.webContents.executeJavaScript(
    "window.score2"
  );

  const game_started = await mainWindow.webContents.executeJavaScript(
    "window.gameStarted"
  );
  const game_started_two = await mainWindow.webContents.executeJavaScript(
    "window.gameStartedTwo"
  );

  if (game_started && !game_started_two) {
    rpc.setActivity({
      details: `eated ${fruits} fruits`,
      state: "hunting for fruits",
      startTimestamp,
      largeImageKey: "swap_logo",
      largeImageText: "Marcello's Snake Game",
      instance: false,
    });
  } else if (!game_started && game_started_two) {
    rpc.setActivity({
      details: `p1: ${fruits} X p2: ${fruits_two}`,
      state: "hunting for fruits with his partner",
      startTimestamp,
      largeImageKey: "swap_logo",
      largeImageText: "Marcello's Snake Game",
      partyMax: 2,
      partySize: 2,
      instance: false,
    });
  } else {
    rpc.setActivity({
      details: `really choosing an option?`,
      state: "in menu",
      startTimestamp,
      largeImageKey: "swap_logo",
      largeImageText: "Marcello's Snake Game",
      instance: false,
    });
  }
}

rpc.on("ready", () => {
  setActivity();

  // activity can only be set every 15 seconds
  setInterval(() => {
    setActivity();
  }, 500); //1e3);
});

rpc.login({ clientId }).catch(console.error);
