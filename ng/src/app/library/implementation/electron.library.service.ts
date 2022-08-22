import {EventEmitter, Injectable} from "@angular/core";
import {LibraryInterface} from "../library.interface";
import {Album, Artist, Song} from "../../models";
import {Observable, from} from "rxjs";

@Injectable()
export class ElectronLibraryService implements LibraryInterface {
    updated: EventEmitter<boolean> = new EventEmitter<boolean>();

    getAllAlbums(): Observable<Album[]> {
        return from(window.electronAPI.getAlbums());
    }

    getAllArtists(): Observable<Artist[]> {
        return from(window.electronAPI.getArtists());
    }

    getAllSongs(): Observable<Song[]> {
        return from(window.electronAPI.getSongs());
    }
    getAlbum(albumId: string): Observable<Album | undefined> {
        return new Observable<Album | undefined>((subscriber) => {
            subscriber.next(undefined);
        });
    }

    getArtist(artistId: string): Observable<Artist | undefined> {
        return new Observable<Artist | undefined>((subscriber) => {
            subscriber.next(new Artist(artistId, "test", []))
        })
    }

    getSong(songId: string): Observable<Song | undefined> {
        return new Observable<Song | undefined>((subscriber) => {
            subscriber.next(undefined);
        });
    }

}
