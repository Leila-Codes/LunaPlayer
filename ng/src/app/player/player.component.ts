import {Component, Inject, OnInit} from '@angular/core';
import {
  faList,
  faPause,
  faPlay,
  faStepBackward,
  faStepForward,
  faVolumeMute,
  faVolumeUp
} from "@fortawesome/free-solid-svg-icons";
import {PlayerService} from "./player.service";
import {PlayRequestType, Song} from "../models";
import {LibraryInterface} from "../library/library.interface";
import {DeviceType, getDeviceType} from "../device.detector";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  playIcon = faPlay
  pauseIcon = faPause
  skipLeft = faStepBackward
  skipRight = faStepForward
  listIcon = faList

  isMuted = false;
  volumeIcon = faVolumeUp
  mutedIcon = faVolumeMute
  lastVolume = 0;

  volumeOpen = false;

  playerPos = "0";
  playerVol = "100";

  nowPlaying: Song | undefined;

  player = new Audio();

  canBackward = false;
  canForward = false;

  constructor(private service: PlayerService, @Inject("LibraryService") private library: LibraryInterface) {
    this.player.preload = 'metadata';
  }

  ngOnInit(): void {
    this.service.playerEE.subscribe((song: Song) => {
      this.nowPlaying = song;

      this.canBackward = this.service.currentIdx > 0;
      this.canForward = this.service.currentIdx < this.service.queue.length - 1;

      this.start(song);
    });

    this.player.addEventListener('timeupdate', (e) => {
      if (this.nowPlaying) {
        const progress = (this.player.currentTime / this.nowPlaying.duration) * 100;
        this.playerPos = progress.toFixed(1);

        console.log(`time update fired: ${this.player.currentTime} / ${this.nowPlaying.duration} (${this.player.duration}`)
      }
    });

    this.player.addEventListener('ended', () => {
      this.start(this.service.getNext());
    });
  }

  skipForward(): void {
    let upNext = this.service.getNext();
    if (upNext) {
      this.start(upNext);
    }
  }

  skipBackward(): void {
    let upLast = this.service.getPrevious();
    if (upLast) {
      this.start(upLast);
    }
  }

  private start(song?: Song) {
    this.nowPlaying = song;

    if (this.nowPlaying) {
      this.player.src = this.nowPlaying.src || this.nowPlaying.location;
      console.log("switched player src to: ", this.player.src);

      this.player.addEventListener('canplay', () => {
        this.player.play();
      }, {once: true});

      this.player.addEventListener('loadedmetadata', () => {
        if (this.nowPlaying)
          this.nowPlaying.duration = this.player.duration;
      }, {once: true});

    } else {
      this.player.currentTime = 0;
      this.player.pause();
    }

  }

  private getApproxPercentage(e: MouseEvent, vertical?: boolean, inverted?: boolean) : number {
    let elem = (<HTMLElement> e.target);
    let rect = elem.getBoundingClientRect();

    if (vertical) {
      if (inverted)
        return (rect.bottom - e.y) / rect.height;
      else
        return (e.y - rect.y) / rect.height;
    } else {
      if (inverted) {
        return (rect.right - e.x) / rect.width;
      } else {
        return (e.x - rect.x) / rect.width;
      }
    }
  }

  seekTrack(e: MouseEvent) {
    if (e.target && this.nowPlaying) {
      let percent = this.getApproxPercentage(e);

      let targetLocation = this.nowPlaying.duration * percent;
      targetLocation = Math.floor(targetLocation * 100) / 100;

      this.player.currentTime = targetLocation;
    }
  }

  adjustVolume(e: MouseEvent) {
    let percent = this.getApproxPercentage(e, true, true);
    percent = Math.floor(percent * 100) / 100;

    this.playerVol = (percent * 100).toFixed(1);

    this.player.volume = percent;
    if (this.player.volume < 0.01) {
      this.isMuted = true;
    } else {
      this.isMuted = false;
    }

  }

  toggleMute() {
    if (this.isMuted) {
      this.isMuted = false
      this.player.volume = this.lastVolume;
    } else {
      this.isMuted = true;
      this.lastVolume = this.player.volume;
      this.player.volume = 0;
    }
  }

  isMobile(): boolean {
    return getDeviceType() === DeviceType.ANDROID;
  }

}
