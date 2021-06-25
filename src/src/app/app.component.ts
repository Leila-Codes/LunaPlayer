import {Router} from "@angular/router";

import {Component, Inject, OnInit} from '@angular/core';
import {LibraryInterface} from "./library/library.interface";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './splash.css']
})
export class AppComponent implements OnInit {
  title = 'LunaPlayer';
  songIcon = faMusic;

  constructor(private router: Router, @Inject("LibraryService") private service: LibraryInterface) {
  }

  ngOnInit() {
  }
}
