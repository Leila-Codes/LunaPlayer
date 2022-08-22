export class Song {
    title: string
    path: string
    album: string
    artist: string
    trackNo: number
    tags: string[] = []


    constructor(title: string, path: string, album: string, artist: string, trackNo: number) {
        this.title = title;
        this.path = path;
        this.album = album;
        this.artist = artist;
        this.trackNo = trackNo;
    }

    addTag(tag: string) {
        this.tags.push(tag);
    }
}

export class Album {
    title: string
    songs: Song[]

    constructor(title: string, songs: Song[] = []) {
        this.title = title;
        this.songs = songs;
    }
}

export class Artist {
    name: string
    songs: Song[]

    constructor(name: string, songs: Song[] = []) {
        this.name = name;
        this.songs = songs;
    }
}

export class MusicLibrary {
    private _songs: Song[] = []
    private _albums: Map<string, Album> = new Map();
    private _artists: Map<string, Artist> = new Map();

    addSong(song: Song) {
        this._songs.push(song);

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

    listAlbums(): Album[] {
        return Array.from(this._albums.values());
    }

    listArtists(): Artist[] {
        return Array.from(this._artists.values());
    }
}
