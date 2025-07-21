import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import { createReadStream, statSync } from 'fs';
import { MusicLibrary } from 'luna-player-lib/library';
import { join } from 'path';
import { DesktopLibraryScanner } from './library.scanner';

let win: BrowserWindow | undefined
export const musicLibrary = new MusicLibrary();


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


    ipcMain.handle('album:list', () => {
        return musicLibrary.listAlbums();
    });

    ipcMain.handle('album:get', (e, album_name) => {
        return musicLibrary.getAlbum(album_name);
    })

    ipcMain.handle('artist:list', () => {
        return musicLibrary.listArtists();
    });

    ipcMain.handle('artist:get', (e, artist_name) => {
        return musicLibrary.getArtist(artist_name);
    })

    ipcMain.handle('song:list', () => {
        return musicLibrary.getAllSongs();
    });

    ipcMain.handle('song:get', (_, song_id) => {
        return musicLibrary.getSongById(song_id);
    })

}

app.whenReady().then(() => {
    const scanner = new DesktopLibraryScanner(musicLibrary, ipcMain);

    protocol.registerStreamProtocol('audio', (req, callback) => {
        const songId = req.url.substring(req.url.lastIndexOf("/") + 1),
            songDef = musicLibrary.getSongById(parseInt(songId))

        if (songDef) {
            const stats = statSync(songDef.path),
                totalSize = stats.size;
            // console.log(`processing song with id ${ songId } - path is ${ songDef.path }`)
            console.log(req.headers);

            const range = req.headers.Range,
                parts = range.replace(/bytes=/, '').split('-'),
                partialStart = parts[0],
                partialEnd = parts[1],

                start = parseInt(partialStart, 10),
                end = partialEnd ? parseInt(partialEnd, 10) : totalSize - 1,
                chunkSize = (end - start) + 1,
                rStream = createReadStream(songDef.path, {start, end});

            callback({
                statusCode: 206,
                headers: {
                    'Content-Type': 'audio/mpeg',
                    'Content-Range': `bytes ${start}-${end}/${totalSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunkSize.toString()
                },
                data: rStream
            })
        }
    })

    createWindow()
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
