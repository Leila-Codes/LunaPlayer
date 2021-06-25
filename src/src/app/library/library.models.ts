import {Album, Artist, Song, TrackNo} from "../models";
import {IAudioMetadata} from "music-metadata/lib/type";

export class MusicLibrary {
  private id: number = 0;

  albums: Map<string, Album>
  artists: Map<string, Artist>
  songs: Map<string, Song>

  constructor() {
    this.albums = new Map;
    this.artists = new Map;
    this.songs = new Map;
  }

  getNextId(): string {
    return (++this.id).toString();
  }

  registerSong(meta: IAudioMetadata, path: string) : void {
    const {album, artist, title, track } = meta.common;
    const { duration } = meta.format;

    const song = new Song(
      this.getNextId(),
      path,
      title || 'Untitled',
      new TrackNo(track.no, track.of),
      album || 'Unknown Album',
      artist || 'Unknown Artist',
      duration || 0
    );
    this.songs.set(song._id, song);

    if (this.albums.has(song.album)) {
      // @ts-ignore
      this.albums.get(song.album).songs.push(song);

    } else {
      this.albums.set(album || 'Unknown', new Album(
        this.getNextId().toString(),
        song.album,
        [song]
      ))
    }

    if (this.artists.has(song.artist)) {
      // @ts-ignore
      this.artists.get(song.artist).songs.push(song);

    } else {
      this.artists.set(song.artist, new Artist(
        this.getNextId().toString(),
        song.artist,
        [song]
      ))
    }
  }
}
