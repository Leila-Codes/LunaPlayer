import {EventEmitter, Injectable} from '@angular/core';
import {ILunaMenu} from "../luna-uikit/luna-action-list/luna-menu.service";
import {Album, Artist, PlayRequestType, Song, TrackNo} from "../models";

@Injectable({
  providedIn: 'root'
})
export class SelectionService implements ILunaMenu {
  openChange = new EventEmitter<boolean>();

  selection: Album | Artist | Song = Song.empty();
  selectionType: PlayRequestType = PlayRequestType.SINGLE;

  constructor() { }

  selectItem(selection: Album | Artist | Song) {
    this.selection = selection;

    if (selection instanceof Album) {
      this.selectionType = PlayRequestType.ALBUM;
    } else if (selection instanceof Artist) {
      this.selectionType = PlayRequestType.ARTIST;
    } else {
      this.selectionType = PlayRequestType.SINGLE;
    }

    this.open();
  }

  open() : void {
    this.openChange.emit(true);
  }

  close(): void {
    this.openChange.emit(false);
  }
}
