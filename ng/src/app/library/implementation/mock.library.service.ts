import { EventEmitter, Injectable } from '@angular/core';
import { LibraryInterface } from '../library.interface';
import { Observable } from 'rxjs';
import { ScanProgress } from 'luna-player-lib/progress.model';
import { Album, Artist, Song, TrackNo } from '../../models';

// <editor-fold desc="Test Data Definitions">
const testSong1 = new Song(
    "testSong1",
    "audio://test.mp3",
    "Test Song 1",
    new TrackNo(1, 1),
    "Test Album 1",
    "Test Artist 1",
    10
)

const testAlbums = [
    new Album("testAlbum1", "Test Album 1", []),
    new Album("testAlbum2", "Test Album 2", []),
    new Album("testAlbum3", "Test Album 3", []),
    new Album("testAlbum4", "Test Album 4", []),
]

const testArtists = [
    new Artist("testArtist1", "Test Artist 1", []),
    new Artist("testArtist2", "Test Artist 2", []),
    new Artist("testArtist3", "Test Artist 3", []),
    new Artist("testArtist4", "Test Artist 4", []),
]
// </editor-fold>

@Injectable()
export class MockLibraryService implements LibraryInterface {
    updated: EventEmitter<ScanProgress> = new EventEmitter();

    constructor() {
        this.updated.emit(new ScanProgress(1, 1))
    }

    getAlbum(albumId: string): Observable<Album | undefined> {
        return new Observable<Album | undefined>(subscriber =>
            subscriber.next(testArtists[0])
        );
    }

    getAllAlbums(): Observable<Album[]> {
        return new Observable<Album[]>(subscriber => {
            subscriber.next(testAlbums)
        });
    }

    getAllArtists(): Observable<Artist[]> {
        return new Observable(subscriber => {
            subscriber.next(testArtists)
        });
    }

    getAllSongs(): Observable<Song[]> {
        return new Observable(subscriber => {
            subscriber.next([testSong1]);
        });
    }

    getArtist(artistId: string): Observable<Artist | undefined> {
        return new Observable(subscriber => {
            subscriber.next(testArtists[0]);
        });
    }

    getSong(songId: number): Observable<Song | undefined> {
        return new Observable(subscriber => {
            subscriber.next(testSong1)
        });
    }

}