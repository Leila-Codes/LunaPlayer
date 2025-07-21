import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AlbumListComponent } from './lists/album-list/album-list.component';
import { ArtistListComponent } from './lists/artist-list/artist-list.component';
import { CatalogListComponent } from './lists/catalog-list/catalog-list.component';
import { ErrorComponent } from './error/error.component';
import { PlayerComponent } from './player/player.component';

import { DeviceType, getDeviceType } from './device.detector';

import { AndroidLibraryService } from './library/implementation/android.library.service';
import { PlayerService } from './player/player.service';
import { AppInformationComponent } from './app-information/app-information.component';
import { LunaUIKitModule } from './luna-uikit/luna-uikit.module';
import { CurrentPlaylistComponent } from './lists/current-playlist/current-playlist.component';
import { SelectionMenuComponent } from './selection-menu/selection-menu.component';
import { ElectronLibraryService } from './library/implementation/electron.library.service';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { MockLibraryService } from './library/implementation/mock.library.service';
import { ErrorHandlerService } from './error/error-handler.service';

let musicLibraryImpl: any;
switch (getDeviceType()) {
    case DeviceType.ANDROID:
        musicLibraryImpl = AndroidLibraryService;
        break;
    case DeviceType.ELECTRON:
        musicLibraryImpl = ElectronLibraryService;
        break;
    default:
        musicLibraryImpl = MockLibraryService;
        break;
}

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        AlbumListComponent,
        ArtistListComponent,
        CatalogListComponent,
        ErrorComponent,
        PlayerComponent,
        AppInformationComponent,
        CurrentPlaylistComponent,
        SelectionMenuComponent,
        LoadingDialogComponent
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        HttpClientModule,
        AppRoutingModule,
        LunaUIKitModule
    ],
    providers: [
        PlayerService,
        ErrorHandlerService,
        { provide: 'LibraryService', useClass: musicLibraryImpl }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
