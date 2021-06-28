import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LunaCardComponent } from './luna-card/luna-card.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { LunaBtnComponent } from './luna-btn/luna-btn.component';

import {LunaActionListComponent} from "./luna-action-list/luna-action-list.component";
import { OverlayComponent } from './overlay/overlay.component';


@NgModule({
  declarations: [
    LunaCardComponent,
    LunaBtnComponent,
    LunaActionListComponent,
    OverlayComponent
  ],
  exports: [
    LunaCardComponent,
    LunaBtnComponent,
    OverlayComponent,
    LunaActionListComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class LunaUIKitModule { }
