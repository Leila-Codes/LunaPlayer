import {Component, Input, OnInit, Output} from '@angular/core';
import Timeout = NodeJS.Timeout;

@Component({
  selector: 'luna-btn',
  templateUrl: './luna-btn.component.html',
  styleUrls: ['./luna-btn.component.css']
})
export class LunaBtnComponent {
  @Input() btnType: string = BtnType.DEFAULT;

  constructor() { }
}

export enum BtnType {
  DEFAULT= 'default',
  ICON_ONLY = 'icon'
}
