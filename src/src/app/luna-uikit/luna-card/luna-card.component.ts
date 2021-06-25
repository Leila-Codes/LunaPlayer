import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import Timeout = NodeJS.Timeout;

@Component({
  selector: 'luna-card',
  templateUrl: './luna-card.component.html',
  styleUrls: ['./luna-card.component.css']
})
export class LunaCardComponent {

  @Input() icon: IconProp = faQuestion;
  @Input() title: string | undefined
  @Input() subtitle: string | undefined
  @Input() color: string = CardBgColor.DEFAULT
  @Input() size: string = CardSize.DEFAULT

  @Output()
  longPressed = new EventEmitter<string>();

  private timer: Timeout | undefined;

  constructor() { }

  touchStart() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(this.longPressHandler.bind(this), 1000);
  }

  touchEnd() {
    if (this.timer)
      clearTimeout(this.timer);
  }

  private longPressHandler() {
    this.longPressed.emit('fire');
  }
}

export enum CardBgColor {
  DEFAULT = 'default',
  PANEL = 'panel'
}

export enum CardSize {
  DEFAULT = 'default',
  SMALL = 'small'
}
