import { Song } from './song'
import { Album } from './album';
import { Artist } from './artist';

export class MusicLibrary {
    // private _songIter: number = 0;
    private _songs: Song[] = []
    private _albums: Map<string, Album> = new Map();
    private _artists: Map<string, Artist> = new Map();

    registerSong(title: string, path: string, album: string, artist: string, trackNo: number) {
        const song = new Song(title, path, album, artist, trackNo);

        const songId = this._songs.push(song)
        song.setId(songId);
        song.src(`audio://${songId}`)

        if (this._albums.has(song.album)) {
            this._albums.get(song.album)?.songs.push(song);
        } else {
            this._albums.set(song.album, new Album(song.album, [song]));
        }

        if (this._artists.has(song.artist)) {
            this._artists.get(song.artist)?.songs.push(song);
        } else {
            this._artists.set(song.artist, new Artist(song.artist, [song]));
        }
    }

    getAlbum(album_title: string): Album | undefined {
        return this._albums.get(album_title);
    }

    getArtist(artist_name: string): Artist | undefined {
        return this._artists.get(artist_name);
    }

    getAllSongs(): Song[] {
        return this._songs;
    }

    getSongById(songId: number): Song | undefined {
        return this._songs[songId];
    }

    listAlbums(): Album[] {
        return Array.from(this._albums.values());
    }

    listArtists(): Artist[] {
        return Array.from(this._artists.values());
    }
}
