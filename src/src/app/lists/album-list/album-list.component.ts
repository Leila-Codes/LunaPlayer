import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Album} from "../../models";
import {faRecordVinyl} from "@fortawesome/free-solid-svg-icons";
import {Subscription} from "rxjs";
import {LibraryInterface} from "../../library/library.interface";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, OnDestroy {
  albums: Album[] = [];
  albumIcon = faRecordVinyl

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
    this.service.getAllAlbums().subscribe((albumList) => {
      this.albums = albumList;

      // console.log(`List has: ${this.albums.length} Album(s)\n Albums are: ${this.albums.map(a => a.name).join(" , ")}`);
    });

  }

}
