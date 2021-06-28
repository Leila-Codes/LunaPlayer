import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Album, Artist, PlayRequest, PlayRequestType, QueueEntry, QueueFilter, Song} from "../models";
import {LibraryInterface} from "../library/library.interface";

@Injectable()
export class PlayerService {
  playerEE: EventEmitter<Song> = new EventEmitter<Song>();
  queueEE: EventEmitter<number> = new EventEmitter<number>();

  currentIdx: number = -1;

  queue: QueueEntry[] = [];

  constructor(@Inject("LibraryService") private library: LibraryInterface) {}

  play(req: PlayRequest, immediate?: boolean) {
    this.library.getSong(req.id).subscribe((song) => {
      if (song) {
        if (req.reqType !== PlayRequestType.SINGLE) {
          this.queue.length = 0;
        }

        this.queue.splice(0, 1, new QueueEntry(song, QueueFilter.USER));

        this.currentIdx = 0;
      }

      this.playerEE.emit(song);

      switch (req.reqType) {
        case PlayRequestType.ALBUM:
          if (req.parentId) {
            this.library.getAlbum(req.parentId).subscribe((album) => {
              if (album) {
                this.setRecommendations(album, req.id);
              }
            })
          }
          break;
        case PlayRequestType.ARTIST:
          if (req.parentId) {
            this.library.getArtist(req.parentId).subscribe((artist) => {
              if (artist) {
                this.setRecommendations(artist, req.id);
              }
            })
          }
          break;
      }
    });

  }

  skipTo(idx: number) {
    if (this.currentIdx < this.queue.length - 1) {
      this.currentIdx = idx;
      this.queueEE.emit(idx);
    }
  }

  addToQueue(req: PlayRequest) {
    if (req.reqType === PlayRequestType.SINGLE) {
      this.library.getSong(req.id).subscribe((song) => {
        if (song)
          // this.queue.push(new QueueEntry(song, QueueFilter.USER));
          this.queue.splice(this.currentIdx + 1, 0, new QueueEntry(song, QueueFilter.USER))
          // this.userQueue.push(song);
      })
    } else {
      console.error(`ENQUEUE METHOD FOR ${req.reqType.toString()} NOT IMPLEMENTED`);
    }
  }

  getCurrent(): Song | undefined {
    let nowPlaying = this.queue[this.currentIdx];

    if (nowPlaying) {
      return nowPlaying.song
    }

    return;
  }

  getPrevious(): Song | undefined {
    let iter = this.currentIdx - 1;

    let upLast;

    if (iter > -1) {
      upLast = this.queue[iter].song;
    }

    if (upLast) {
      this.currentIdx = iter;
      this.queueEE.emit(iter);
    }

    return upLast;
  }

  getNext(): Song | undefined {
    let iter = this.currentIdx + 1;

    let upNext;

    if (iter < this.queue.length) {
      upNext = this.queue[iter].song;
    }

    if (upNext) {
      this.currentIdx = iter;
      this.queueEE.emit(iter);
    }

    return upNext;
  }

  clearQueue() {
    this.queue.length = 0;

    this.playerEE.emit();
  }

  private setRecommendations(queueSrc: Album | Artist, songId: string) {
    // Clear Recommendations
    // this.clearRecommendations();

    // Trim recommendations to start from the selected song
    let startIdx = queueSrc.songs.findIndex(a => a._id === songId);

    // Add as recommendations to the queue
    let recommendations = queueSrc.songs.slice(startIdx + 1).map(a => new QueueEntry(a, QueueFilter.RECOMMENDED));
    this.queue.push(...recommendations);
  }
/*

  private trimQueue(queueSrc: Album | Artist, songId: string) {
    let queue = queueSrc.songs;

    let startIdx = queue.findIndex(a => a._id === songId);
    this.currentIdx = startIdx;
    /!*if (startIdx > -1) {
      queue = queue.slice(startIdx + 1);
    }*!/

    this.recommendedQueue = queue;
  }*/
}
