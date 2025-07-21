import { EventEmitter, Injectable } from '@angular/core';
import { Album, Artist, Song } from '../../models';
import { MusicLibrary } from '../library.models';

import { parseBlob } from 'music-metadata-browser'
import { SUPPORTED_FILE_EXTENSIONS } from 'luna-player-lib/scanner.interface';
import { ScanProgress } from 'luna-player-lib/progress.model';
import { LibraryInterface } from '../library.interface';
import { Observable } from 'rxjs';
import { ErrorHandlerService } from '../../error/error-handler.service';

@Injectable()
export class AndroidLibraryService implements LibraryInterface {
    private library = new MusicLibrary();
    private _expected: number = 0;
    private _processed: number = 0;

    updated = new EventEmitter<ScanProgress>();

    private cacheDir = window.cordova.file.cacheDirectory;
    private basePath = `${ window.cordova.file.externalRootDirectory }Music`;
    private cacheFileName = 'luna.library.db';

    constructor(private errorService: ErrorHandlerService) {
        console.debug('Music Library Initialising ...');
        if (window.cordova) {
            console.log('Cordova Detected Successfully!');

            setTimeout(() => {
                console.debug('Checking System Permissions...');

                const permissions = window.cordova.plugins.permissions;
                permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, (status: any) => {
                    if (status.hasPermission) {
                        this.loadCache();
                    } else {
                        permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, () => {
                            this.loadCache();
                        }, (err: any) => {
                            errorService.raiseError('Permissions Error - No read/write access to external storage.')
                            // window.close();
                        })
                    }
                }, () => {
                    errorService.raiseError('Permissions Error - No read/write access to external storage.')
                    // window.close();
                });
            }, 1000);
        }
    }

    private writeCache(): void {
        const instance = this;

        window.resolveLocalFileSystemURL(this.cacheDir, (_dir: Entry) => {
            (<DirectoryEntry>_dir).getFile(this.cacheFileName, { create: true }, (newFile) => {
                newFile.createWriter((writer) => {
                    writer.write(JSON.stringify(instance.library));
                })
            });

        }, this.loadLibrary.bind(this))
    }

    private loadCache(): void {
        const instance = this;

        window.resolveLocalFileSystemURL(this.cacheDir + this.cacheFileName, (_fileRef: Entry) => {
            (<FileEntry>_fileRef).file((_file) => {
                const reader = new FileReader();
                reader.onloadend = function () {
                    instance.library = JSON.parse(<string>this.result);

                    instance.updated.emit(new ScanProgress(1, 1));
                }
                reader.readAsText(_file);
            }, this.loadLibrary.bind(instance));

        }, this.loadLibrary.bind(instance))
    }

    private onListRetrieved(entries: Entry []) {
        entries.forEach((entry) => {
            if (entry.isDirectory) {
                //console.debug(`Sub-folder detected... scanning contents of ${entry.fullPath}`);

                this.onFileSystemRequested(<DirectoryEntry>entry);
                // this.onFileSystemRequested.bind(this, entry);
            } else if (entry.isFile) {
                //console.debug(`file found: ${entry.fullPath}`);
                // If IS supported media file
                if (entry.name.match(SUPPORTED_FILE_EXTENSIONS)) {
                    this._expected++;

                    //console.debug(`is music ... attempting to fetch: ${entry.toURL()}`);

                    (<FileEntry>entry).file((file) => {
                        parseBlob(file).then((meta) => {
                            this._processed++;

                            this.library.registerSong(
                                meta,
                                entry.toURL()
                                // entry.fullPath
                            );

                            // Let components know the library has been updated.
                            this.updated.emit(new ScanProgress(this._processed, this._expected));

                            if (this._processed >= this._expected) {
                                this.writeCache();
                            }
                        })
                    })
                } else {
                    console.debug('not music ... skipping');
                }
            }
        })
    }

    private onFileSystemRequested(fs: DirectoryEntry) {
        const reader = fs.createReader();
        reader.readEntries(this.onListRetrieved.bind(this));
    }

    loadLibrary() {
        const instance = this;

        window.resolveLocalFileSystemURL(this.basePath, (e) => {
            this.onFileSystemRequested.apply(this, [ (<DirectoryEntry>e) ]);
        })
    }

    getAllAlbums(): Observable<Album[]> {
        return new Observable(subscriber => {
            subscriber.next(Array.from(this.library.albums.values()));
        });
    }

    getAllArtists(): Observable<Artist[]> {
        return new Observable(subscriber => {
            subscriber.next(Array.from(this.library.artists.values()));
        });
    }

    getAllSongs(): Observable<Song[]> {
        return new Observable(subscriber => {
            subscriber.next(Array.from(this.library.songs.values()));
        });
    }

    getAlbum(albumId: string): Observable<Album | undefined> {
        return new Observable(subscriber => {
            subscriber.next(Array.from(this.library.albums.values()).find(a => a._id === albumId));
        });
    }

    getArtist(artistId: string): Observable<Artist | undefined> {
        return new Observable(subscriber => {
            subscriber.next(Array.from(this.library.artists.values()).find(a => a._id === artistId));
        });
    }

    getSong(songId: number): Observable<Song> {
        return new Observable(subscriber => {
            subscriber.next(this.library.songs.get(songId.toString()));
        });
    }
}
