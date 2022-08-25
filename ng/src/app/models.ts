import {IAudioMetadata, ICommonTagsResult} from "music-metadata/lib/type";

export interface Selection {
  _id: string
  title?: string
  name?: string
}

export class Song implements Selection {
  _id: string
  location: string
  src: string | undefined
  title: string
  trackNo: TrackNo
  album: string
  artist: string
  duration: number

  constructor(id : string, location: string, title : string, track : TrackNo, album : string, artist: string, duration: number) {
    this._id = id;
    this.location = location;
    this.title = title;
    this.trackNo = track;
    this.album = album;
    this.artist = artist;
    this.duration = duration;
  }

  static empty() {
    return new Song("", "", "", new TrackNo(-1), "", "", 0)
  }
}

export enum PlayRequestType {
  ALBUM,
  ARTIST,
  SINGLE
}

export class PlayRequest {
  reqType: PlayRequestType
  id: string
  parentId: string | undefined

  constructor(id: string, reqType: PlayRequestType, parentId?: string) {
    this.id = id;
    this.reqType = reqType;
    this.parentId = parentId;
  }
}

export class QueueEntry {
  song: Song
  addedBy: QueueFilter

  constructor(song: Song, addedBy: QueueFilter) {
    this.song = song;
    this.addedBy = addedBy;
  }
}

export enum QueueFilter {
  USER,
  RECOMMENDED
}

export class TrackNo {
  no: number
  of: number

  constructor(no : (number | null), of? : (number | null)) {
    this.no = no || -1;
    this.of = of || -1;
  }

  static fromTags(i: ICommonTagsResult) {
    return new TrackNo(i.track.no, i.track.of);
  }
}

/*class AudioProto {
  _id: string
  name: string

  constructor(id: string, name: string) {
    this._id = id;
    this.name = name;
  }
}*/

export class Album implements Selection {
  _id: string
  name: string
  songs: Song[]

  constructor(id : string, name : string, songs: Song[]) {
    this._id = id;
    this.name = name;
    this.songs = songs;
  }

  static fromTags(i: ICommonTagsResult) {
    return new Album(
      "0",
      i.album || 'Unknown',
      []
    )
  }
}

export class Artist implements Selection {
  _id: string
  name: string
  songs: Song[]

  constructor(id : string, name : string, songs: Song[]) {
    this._id = id;
    this.name = name;
    this.songs = songs;
  }

  static fromTags(i: ICommonTagsResult) {
    return new Artist(
      "0",
      i.artist || 'Unknown',
      []
    )
  }
}
/*

export class AlbumDetails extends AudioProto {
  songs: string[]
  _songs: Song[]

  constructor(id: string, name: string, songs: string[], songDetails?: Song[]) {
    super(id, name);
    this.songs = songs;
    this._songs = songDetails || [];
  }
}

export class ArtistDetails extends AlbumDetails {}
*/
