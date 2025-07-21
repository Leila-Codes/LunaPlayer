import { Component, Input } from '@angular/core';
import {SelectionService} from "../../selection-menu/selection.service";

@Component({
  selector: 'luna-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css']
})
export class OverlayComponent {
  @Input() mouseClickCloses: boolean = false
  isOpen = false;

  constructor() {
    /*this.service.openChange.subscribe((isOpen) => {
      this.isOpen = isOpen;
    })*/
  }

  open(): void {
    this.isOpen = true;
  }
  close(): void {
    this.isOpen = false;
  }
}
