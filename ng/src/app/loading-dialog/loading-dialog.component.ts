import { Component, Host, Inject, OnInit } from '@angular/core';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { OverlayComponent } from '../luna-uikit/overlay/overlay.component';
import { LibraryInterface } from '../library/library.interface';
import { ScanProgress } from 'luna-player-lib/progress.model';

@Component({
    selector: 'app-loading-dialog',
    templateUrl: './loading-dialog.component.html',
    styleUrls: [ './loading-dialog.component.css' ]
})
export class LoadingDialogComponent implements OnInit {
    loadingIcon = faTasks
    progressWidth: string = '0%'

    processed: number = 0
    discovered: number = 0

    constructor(@Host() private overlay: OverlayComponent, @Inject('LibraryService') private libraryService: LibraryInterface) {
        this.overlay.open();
    }

    ngOnInit(): void {
        // this.overlay.open();
        this.libraryService.updated.subscribe((progEvent: ScanProgress) => {
            this.processed = progEvent.processed
            this.discovered = progEvent.discovered
            this.progressWidth = `${progEvent.percent()}%`;

            if (progEvent.processed >= progEvent.discovered) {
                this.overlay.close();
            }
        })

    }
}
