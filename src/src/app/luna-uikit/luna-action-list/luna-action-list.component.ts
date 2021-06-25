import {Component, Host, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {OverlayComponent} from "../overlay/overlay.component";

@Component({
  selector: 'luna-action-list',
  templateUrl: './luna-action-list.component.html',
  styleUrls: ['./luna-action-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LunaActionListComponent {
  @Input() icon: IconProp | undefined
  @Input() title: string | undefined

  constructor() {
  }
}

