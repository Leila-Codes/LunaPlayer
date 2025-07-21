import {Album, Artist, Song} from "../../models";

declare global {
    interface Window {
        electronAPI: electronPlayerWrapper,
        // cordova: Cordova
    }
}
export interface electronPlayerWrapper {
    getAlbums(): Promise<Album[]>

    getAlbumDetail(album_name: string): Promise<Album>

    getArtists(): Promise<Artist[]>

    getArtistDetail(artist_name: string): Promise<Artist>

    getSongs(): Promise<Song[]>

    getSongDetail(songId: number): Promise<Song>
}
