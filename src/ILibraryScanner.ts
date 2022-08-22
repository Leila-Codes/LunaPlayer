export const SUPPORTED_FILE_EXTENSIONS = /\.(mp3|wav|ogg|m4a)$/gm

export class ScanProgressUpdate {
    readonly processed: number
    readonly discovered: number

    constructor(processed: number, discovered: number) {
        this.processed = processed;
        this.discovered = discovered;
    }
}

export interface ILibraryScanner {
    readDirectory()

    readFile()

    notifyProgress(ScanProgressUpdate)
}

export abstract class LibraryScanner implements ILibraryScanner{
    shouldScan(f: File): boolean {
        return f.name.match(SUPPORTED_FILE_EXTENSIONS).length > 0;
    }

    abstract notifyProgress(ScanProgressUpdate)

    abstract readDirectory();

    abstract readFile();
}
