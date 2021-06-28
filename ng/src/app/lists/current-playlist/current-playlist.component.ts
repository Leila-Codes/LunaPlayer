import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../player/player.service";
import {QueueEntry, QueueFilter, Song} from "../../models";
import {faMusic, faStream, faTimes} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-current-playlist',
  templateUrl: './current-playlist.component.html',
  styleUrls: ['./current-playlist.component.css']
})
export class CurrentPlaylistComponent implements OnInit {
  songIcon = faMusic
  listIcon = faStream
  clearIcon = faTimes

  nowPlaying: Song | undefined
  userQueue: Song[] = []
  recommendedQueue: Song[] = []

  constructor(private service: PlayerService) {

  }

  ngOnInit(): void {
    this.loadQueue();

    this.service.queueEE.subscribe(() => {
      this.loadQueue();
    })
  }

  skipTo(idx: number) {
    this.service.skipTo(idx);
  }

  loadQueue() {
    let queue = this.service.queue;

    let userAdded: Song[] = [],
      recommended: Song[] = [];

    queue.forEach((entry, i) => {
      if (i > this.service.currentIdx) {
        if (entry.addedBy === QueueFilter.RECOMMENDED ) {
          recommended.push(entry.song);
        } else {
          userAdded.push(entry.song);
        }
      }
    })

    this.userQueue = userAdded;
    this.recommendedQueue = recommended;

    this.nowPlaying = this.service.getCurrent();
  }

  clearQueue() {
    this.service.clearQueue();
    this.loadQueue();
  }

}
