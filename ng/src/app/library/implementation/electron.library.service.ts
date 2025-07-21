import { EventEmitter, Injectable } from '@angular/core';
import { LibraryInterface } from '../library.interface';
import { Album, Artist, Song } from '../../models';
import { from, Observable } from 'rxjs';
import { ScanProgress } from 'luna-player-lib/progress.model';


@Injectable()
export class ElectronLibraryService implements LibraryInterface {
    updated: EventEmitter<ScanProgress> = new EventEmitter();

    getAllAlbums(): Observable<Album[]> {
        return from(window.electronAPI.getAlbums());
    }

    getAllArtists(): Observable<Artist[]> {
        return from(window.electronAPI.getArtists());
    }

    getAllSongs(): Observable<Song[]> {
        return from(window.electronAPI.getSongs());
    }
    getAlbum(album_name: string): Observable<Album | undefined> {
        return from (window.electronAPI.getAlbumDetail(album_name));
    }

    getArtist(artist_name: string): Observable<Artist | undefined> {
        return from (window.electronAPI.getArtistDetail(artist_name));
    }

    getSong(songId: number): Observable<Song | undefined> {
        return from (window.electronAPI.getSongDetail(songId))
    }

}
