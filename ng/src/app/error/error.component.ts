import { Component, Host, OnInit } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';
import { OverlayComponent } from '../luna-uikit/overlay/overlay.component';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  @Host() private dialogContainer: OverlayComponent | undefined

  errorIcon = faExclamationCircle
  message = ""

  constructor(private router: Router, private service: ErrorHandlerService) { }

  ngOnInit(): void {
    this.service.errorHandler.subscribe((message) => {
      this.message = message;
      this.open()
    })
  }

  open(): void {
    this.dialogContainer?.open();
  }

  close(): void {
    this.dialogContainer?.close();
  }

  // goHome(): void {
  //   this.router.navigateByUrl('/albums/list');
  // }

}
