export class Song {
    private _id: number | undefined
    title: string
    path: string
    album: string
    artist: string
    trackNo: number
    private _src: string = ""
    tags: string[] = []

    constructor(title: string, path: string, album: string, artist: string, trackNo: number) {
        // this._id = id;
        this.title = title;
        this.path = path;
        this.album = album;
        this.artist = artist;
        this.trackNo = trackNo;

        // this.src = src;
    }

    setId(id: number): void {
        if (!this._id)
            this._id = id
    }

    src(src?: string): string {
        if (src)
            this._src = src

        return this._src
    }

    addTag(tag: string) {
        this.tags.push(tag);
    }
}