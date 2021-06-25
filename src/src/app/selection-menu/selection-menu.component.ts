import {Component, Host} from '@angular/core';
import {SelectionService} from "./selection.service";
import {faCompactDisc, faList, faMusic, faPlay, faPlus, faTimes, faUser} from "@fortawesome/free-solid-svg-icons";
import {OverlayComponent} from "../luna-uikit/overlay/overlay.component";
import {PlayRequest, PlayRequestType, Selection, Song} from "../models";
import {PlayerService} from "../player/player.service";

@Component({
  selector: 'app-selection-menu',
  templateUrl: './selection-menu.component.html',
  styleUrls: ['./selection-menu.component.css']
})
export class SelectionMenuComponent {
  isOpen = false;

  entityIcon = faMusic;

  selection : Selection = Song.empty();
  selectionType: PlayRequestType = PlayRequestType.SINGLE;

  constructor(@Host() private overlay: OverlayComponent, private service: SelectionService, private player: PlayerService) {
    this.service.openChange.subscribe((isOpen) => {
      this.isOpen = isOpen;

      this.isOpen ? this.open() : this.close();

      this.selection = service.selection;
      this.selectionType = service.selectionType;

      switch (service.selectionType) {
        case  PlayRequestType.ALBUM:
          this.entityIcon = faCompactDisc;
          break;
        case PlayRequestType.ARTIST:
          this.entityIcon = faUser;
          break;
        default:
          this.entityIcon = faMusic;
          break;
      }
    })
  }

  playSelection() {
    this.player.play(new PlayRequest(
      this.selection._id,
      this.selectionType
    ), true);
  }

  queueSelection() {
    this.player.addToQueue(new PlayRequest(
      this.selection._id,
      this.selectionType
    ));
  }

  open(): void {
    this.overlay.open();
  }

  close(): void {
    this.overlay.close();
  }


  playIcon = faPlay
  plusIcon = faPlus
  listIcon = faList
  cancelIcon = faTimes

}
