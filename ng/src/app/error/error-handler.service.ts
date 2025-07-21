import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  public errorHandler = new EventEmitter<string>();

  constructor() { }

  raiseError(message: string) {
    this.errorHandler.emit(message);
  }
}
