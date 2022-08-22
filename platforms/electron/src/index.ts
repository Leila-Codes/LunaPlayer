import { BrowserWindow, app, ipcMain } from "electron"
// @ts-ignore
import {Album, Artist, MusicLibrary, Song} from "../../../src/library";
import { join } from "path";

let win: BrowserWindow | undefined
const library = new MusicLibrary();

// Fill library with TEST data
library.addSong(
    new Song("Test Song 1", "./test.mp3", "Untitled Test", "The sequel", 1)
);
library.addSong(
    new Song("Test Song 2", "./test.mp3", "Untitled Test", "The sequel", 2),
);
library.addSong(
    new Song("Test Song 3", "./test.mp3", "Untitled Test", "The sequel", 3),
);
library.addSong(
    new Song("Test Song 4", "./test.mp3", "Untitled Test", "Starlord", 4)
);


export default function createWindow() {
    if (!win)
        win = new BrowserWindow({
            title: 'Luna Player',
            darkTheme: true,
            width: 900,
            height: 800,
            webPreferences: {
                preload: join(__dirname, 'preload.js')
            }
            // titleBarStyle: "hidden",
            // frame: false
        })


    win.webContents.openDevTools();
    win.loadFile(join(__dirname, "../www/index.html"));


    ipcMain.handle('albumList', () => {
        return library.listAlbums();
    });

    ipcMain.handle('artistList', () => {
        return library.listArtists();
    });

    ipcMain.handle('songList', () => {
        return library.getAllSongs();
    });
}

app.whenReady().then(() => {
    createWindow()

    // app.on('activate', function () {
    //     if (BrowserWindow.getAllWindows().length === 0) createWindow()
    // })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
