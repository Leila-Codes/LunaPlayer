import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Artist} from "../../models";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {Subscription} from "rxjs";
import {LibraryInterface} from "../../library/library.interface";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit, OnDestroy {
  artists: Artist[] = [];
  artistIcon = faUser

  private sub: Subscription | undefined;

  constructor(@Inject("LibraryService") private service: LibraryInterface) {
  }

  ngOnInit(): void {
    this.refreshList();
    // Watch for changes to the library.
    this.sub = this.service.updated.subscribe(() => {
      this.refreshList();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  refreshList(): void {
    this.service.getAllArtists().subscribe((artistList) => {
      this.artists = artistList;

      // console.log(`List has: ${this.artists.length} Artists(s)\n Artists are: ${this.artists.map(a => a.name).join(" , ")}`);
    })
  }

}
