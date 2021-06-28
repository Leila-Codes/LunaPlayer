import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AlbumListComponent} from "./lists/album-list/album-list.component";
import {ArtistListComponent} from "./lists/artist-list/artist-list.component";
import {CatalogListComponent} from "./lists/catalog-list/catalog-list.component";
import {ErrorComponent} from "./error/error.component";
import {CurrentPlaylistComponent} from "./lists/current-playlist/current-playlist.component";

const routes: Routes = [
  // { path: '', redirectTo: 'albums/list', pathMatch: 'full' },
  { path: 'albums/list', component: AlbumListComponent},
  { path: 'artists/list', component: ArtistListComponent},
  { path: ':type/:id', component: CatalogListComponent},
  { path: 'catalog/songs', component: CatalogListComponent},
  { path: 'playlist', component: CurrentPlaylistComponent},
  { path: 'error', component: ErrorComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
