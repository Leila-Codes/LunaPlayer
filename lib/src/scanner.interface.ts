import { ScanProgress } from './progress.model'

export const SUPPORTED_FILE_EXTENSIONS = /\.(mp3|wav|ogg|m4a)$/gm

export abstract class LibraryScanner {
    shouldScan(fileName: string): boolean {
        const match = fileName.match(SUPPORTED_FILE_EXTENSIONS)
        return match !== null && match.length > 0;
    }

    abstract notifyProgress(progress: ScanProgress): any;

    abstract readDirectory(path: string): any;

    abstract readFile(path: string): any;
}
