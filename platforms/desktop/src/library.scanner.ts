import { readdir } from 'fs';
import { ScanProgress } from '../luna-library-lib/progress.model';
import { LibraryScanner } from '../luna-library-lib/scanner.interface';
import * as mm from 'music-metadata';
import { homedir } from 'os';
import { join, sep } from 'path';
import { MusicLibrary } from '../luna-library-lib/library';
import { IpcMain } from 'electron'

export class DesktopLibraryScanner extends LibraryScanner {
    private _scanProgress: ScanProgress = new ScanProgress()

    constructor(private library: MusicLibrary, private ipcMain: IpcMain) {
        super();
        this.readDirectory(join(homedir(), 'Music'))
    }

    notifyProgress(progress: ScanProgress) {
        this.ipcMain.emit('scan:progress', progress);
    }

    readDirectory(path: string) {
        readdir(path, { withFileTypes: true }, (err, fileList) => {
            this._scanProgress.increaseDiscovered(fileList.length);
            fileList.forEach((f) => {
                if (f.isDirectory()) {
                    this.readDirectory.apply(this, [join(path, f.name)]);
                } else if (f.isFile() && this.shouldScan(f.name)) {
                    this.readFile.apply(this, [join(path, f.name)]);
                }
            });
        })
    }

    readFile(path: string) {
        console.log(`importing ${path} to music library...`)
        mm.parseFile(path).then((meta) => {
            this.library.registerSong(
                meta.common.title || path.substring(path.lastIndexOf(sep) + 1),
                path,
                meta.common.album || 'Unknown Album',
                meta.common.artist || 'Unkown Artist',
                meta.common.track.no || -1
            );
            this._scanProgress.incrementProcessed();
            this.notifyProgress(this._scanProgress)
        })
    }

}
