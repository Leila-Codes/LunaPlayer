import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Album, Artist, PlayRequest, PlayRequestType, Song} from "../../models";
import {faList, faMusic, faQuestion, faRecordVinyl, faUser} from "@fortawesome/free-solid-svg-icons";
import {PlayerService} from "../../player/player.service";
import {LibraryInterface} from "../../library/library.interface";
import {SelectionService} from "../../selection-menu/selection.service";

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.css']
})
export class CatalogListComponent implements OnInit {
  // resType: string = "Album";
  resType: PlayRequestType = PlayRequestType.ALBUM;
  // entityInfo: AlbumDetails | ArtistDetails | undefined;

  entity: Album | Artist | undefined;

  entityIcon = faQuestion;
  trackIcon = faMusic;

  constructor(private route: ActivatedRoute, @Inject("LibraryService") private service: LibraryInterface, private router: Router, private player: PlayerService, private selector: SelectionService) {
  }

  goToError(): void {
    this.router.navigateByUrl('error');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const resType = params.get('type');
      const id = params.get('id');

      if (resType === "album" && id) {
        this.resType = PlayRequestType.ALBUM
        this.entityIcon = faRecordVinyl;

        this.service.getAlbum(id).subscribe((album) => {
          this.entity = album;
          console.log("Album:", album);

        });

      } else if (resType == "artist" && id) {
        this.resType = PlayRequestType.ARTIST
        this.entityIcon = faUser;

        this.service.getArtist(id).subscribe((artist) => {
          this.entity = artist;
          console.log("Artist:", artist);
        });
      } else if(resType == "catalog") {
        this.resType = PlayRequestType.SINGLE;
        this.entityIcon = faList;

        this.service.getAllSongs().subscribe((songs) => {
          this.entity = new Album(
            "0",
            "Complete Song List",
            songs
          );
        })
      } else {
        this.goToError();
      }

      console.log(`attempting to load ${resType} with id ${id}`);
      console.log(this.entity);
    })
  }

  enqueue(id: string): void {
    const req = new PlayRequest(
        id,
        this.resType,
        this.entity?._id
    );

    console.log("play request: ", req);

    this.player.play(req)
  }

  longPressHandler(song: Song) {
    this.selector.selectItem(song);
    navigator.vibrate(200);
  }

}
