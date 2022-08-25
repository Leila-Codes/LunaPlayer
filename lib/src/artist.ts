import { Song } from './song'

export class Artist {
    name: string
    songs: Song[]

    constructor(name: string, songs: Song[] = []) {
        this.name = name;
        this.songs = songs;
    }
}
