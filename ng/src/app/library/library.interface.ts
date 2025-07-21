import { ScanProgress } from 'luna-player-lib/progress.model'
import {Album, Artist, Song} from "../models";
import {EventEmitter} from "@angular/core";
import {Observable} from "rxjs";

export interface LibraryInterface {
  updated: EventEmitter<ScanProgress>

  getAllAlbums(): Observable<Album[]>

  getAllArtists() : Observable<Artist[]>

  getAllSongs() : Observable<Song[]>

  getAlbum(albumId: string) : Observable<Album | undefined>

  getArtist(artistId: string) : Observable<Artist | undefined>

  getSong(songId: number) : Observable<Song | undefined>
}
