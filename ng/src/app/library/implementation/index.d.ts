import {Album, Artist, Song} from "../../models";

declare global {
    interface Window {
        electronAPI: electronPlayerWrapper
    }
}
export interface electronPlayerWrapper {
    getAlbums(): Promise<Album[]>

    getArtists(): Promise<Artist[]>

    getSongs(): Promise<Song[]>
}
