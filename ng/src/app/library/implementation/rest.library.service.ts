import { environment } from '../../../environments/environment';

import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Album, Artist, Song} from "../../models";
import {LibraryInterface} from "../library.interface";

@Injectable({
  providedIn: 'root'
})
export class RestLibraryService implements LibraryInterface {
  updated = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.API_URL}/albums/list`);
  }

  getAllArtists(): Observable<Artist[]> {
    return this.http.get<Album[]>(`${environment.API_URL}/artists/list`);
  }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${environment.API_URL}/songs/all`);
  }

  getAlbum(id: string): Observable<Album | undefined> {
    return this.http.get<Album | undefined>(`${environment.API_URL}/albums/${id}`);
  }

  getArtist(id: string): Observable<Artist | undefined> {
    return this.http.get<Artist | undefined>(`${environment.API_URL}/artists/${id}`);
  }

  getSong(id: string) : Observable<Song | undefined> {
    return this.http.get<Song>(`${environment.API_URL}/songs/${id}`);
  }
}
