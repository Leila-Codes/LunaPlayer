"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicLibrary = exports.Artist = exports.Album = exports.Song = void 0;
class Song {
    constructor(title, path, album, artist, trackNo) {
        this.tags = [];
        this.title = title;
        this.path = path;
        this.album = album;
        this.artist = artist;
        this.trackNo = trackNo;
    }
    addTag(tag) {
        this.tags.push(tag);
    }
}
exports.Song = Song;
class Album {
    constructor(title, songs = []) {
        this.title = title;
        this.songs = songs;
    }
}
exports.Album = Album;
class Artist {
    constructor(name, songs = []) {
        this.name = name;
        this.songs = songs;
    }
}
exports.Artist = Artist;
class MusicLibrary {
    constructor() {
        this._songs = [];
        this._albums = new Map();
        this._artists = new Map();
    }
    addSong(song) {
        var _a, _b;
        this._songs.push(song);
        if (this._albums.has(song.album)) {
            (_a = this._albums.get(song.album)) === null || _a === void 0 ? void 0 : _a.songs.push(song);
        }
        else {
            this._albums.set(song.album, new Album(song.album, [song]));
        }
        if (this._artists.has(song.artist)) {
            (_b = this._artists.get(song.artist)) === null || _b === void 0 ? void 0 : _b.songs.push(song);
        }
        else {
            this._artists.set(song.artist, new Artist(song.artist, [song]));
        }
    }
    getAlbum(album_title) {
        return this._albums.get(album_title);
    }
    getArtist(artist_name) {
        return this._artists.get(artist_name);
    }
    getAllSongs() {
        return this._songs;
    }
    listAlbums() {
        return Array.from(this._albums.values());
    }
    listArtists() {
        return Array.from(this._artists.values());
    }
}
exports.MusicLibrary = MusicLibrary;
