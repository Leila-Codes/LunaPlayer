import {Injectable, EventEmitter} from "@angular/core";
import {Album, Artist, Song, TrackNo} from "../../models";
import {MusicLibrary} from "../library.models";

import {parseBlob} from 'music-metadata-browser'
import {LibraryInterface} from "../library.interface";
import {Observable} from "rxjs";

@Injectable()
export class AndroidLibraryService implements LibraryInterface {
  private library = new MusicLibrary();
  updated = new EventEmitter<boolean>();

  constructor() {
    console.debug("Music Library Initialising ...");
    if (window.cordova) {
      console.log("Cordova Detected Successfully!");

      setTimeout(() => {
        console.debug("Checking System Permissions...");

        const permissions = cordova.plugins.permissions;
        permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, ( status: any ) => {
          if ( status.hasPermission ) {
            this.loadLibrary();
          } else {
            permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, () => {
              this.loadLibrary();
            }, (err: any) => {
              console.error("something went terribly wrong.");
              window.close();
            })
          }
        }, () => {
          console.error("something went terribly wrong.");
          window.close();
        });
      }, 1000);
    }
  }

  private onListRetrieved( entries: Entry[] ) {
    entries.forEach((entry) => {
      if (entry.isDirectory) {
        //console.debug(`Sub-folder detected... scanning contents of ${entry.fullPath}`);

        this.onFileSystemRequested(entry);
        // this.onFileSystemRequested.bind(this, entry);
      } else if (entry.isFile) {
        //console.debug(`file found: ${entry.fullPath}`);
        // If IS supported media file
        if (entry.name.match(/\.(mp3|wav|ogg|m4a)$/gm)) {
          //console.debug(`is music ... attempting to fetch: ${entry.toURL()}`);

          (<FileEntry>entry).file((file) => {
            parseBlob(file).then((meta) => {

              this.library.registerSong(
                meta,
                entry.toURL()
                // entry.fullPath
              );

              // Let components know the library has been updated.
              this.updated.emit(true);
            })
          })
        } else {
          console.debug("not music ... skipping");
        }
      }
    })
  }

  private onFileSystemRequested( fs: any ) {
    const reader = fs.createReader();
    reader.readEntries(this.onListRetrieved.bind(this));
  }

  loadLibrary() {
    const basePath = `${cordova.file.externalRootDirectory}Music`;

    window.resolveLocalFileSystemURL(basePath, this.onFileSystemRequested.bind(this))
  }

  getAllAlbums() : Observable<Album[]> {
    return new Observable(subscriber => {
      subscriber.next(Array.from(this.library.albums.values()));
    });
  }

  getAllArtists() : Observable<Artist[]> {
    return new Observable(subscriber => {
      subscriber.next(Array.from(this.library.artists.values()));
    });
  }

  getAllSongs() : Observable<Song[]> {
    return new Observable(subscriber => {
      subscriber.next(Array.from(this.library.songs.values()));
    });
  }

  getAlbum(albumId: string) : Observable<Album | undefined> {
    return new Observable(subscriber => {
      subscriber.next(Array.from(this.library.albums.values()).find(a => a._id === albumId));
    });
  }

  getArtist(artistId: string) : Observable<Artist | undefined> {
    return new Observable(subscriber => {
      subscriber.next(Array.from(this.library.artists.values()).find(a => a._id === artistId));
    });
  }

  getSong(songId: string) : Observable<Song | undefined> {
    return new Observable(subscriber => {
      subscriber.next(this.library.songs.get(songId));
    });
  }
}
