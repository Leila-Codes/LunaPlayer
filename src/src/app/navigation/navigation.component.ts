import {Component, Inject, OnInit} from '@angular/core';
import {faBars, faCompactDisc, faPlay, faUser} from "@fortawesome/free-solid-svg-icons";
import {LibraryInterface} from "../library/library.interface";
import {AndroidLibraryService} from "../library/implementation/android.library.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  playIcon = faPlay
  albumIcon = faCompactDisc
  artistIcon = faUser
  catalogIcon = faBars
  
  constructor() {}

  ngOnInit(): void {
  }

}
