import { sep } from "path";
import { readdir } from "fs"
import {ILibraryScanner, LibraryScanner} from "./ILibraryScanner";

export class FileEntry {
    name: string
    path: string
    isDirectory: boolean
    isFile: boolean

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;

        this.isDirectory = path.indexOf(sep) === path.length - 1;
        this.isFile = !this.isDirectory;
    }
}

export class ElectronLibraryScanner extends LibraryScanner {
    constructor() {
        super();
        this.readDirectory()
    }

    notifyProgress(ScanProgressUpdate) {
    }

    readDirectory(d: Dir) {
    }

    readFile() {
    }

}
