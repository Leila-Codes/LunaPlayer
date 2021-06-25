import {EventEmitter, Injectable} from '@angular/core';
import {Album, Artist, PlayRequestType, Song} from "../../models";

export interface ILunaMenu {
  openChange: EventEmitter<boolean>

  open() : void

  close(): void
}
