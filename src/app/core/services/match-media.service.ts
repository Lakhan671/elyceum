import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class FuseMatchMedia
{
    activeMediaQuery: string;
    onMediaChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(private MediaObserver: MediaObserver)
    {
        this.activeMediaQuery = '';
        this.MediaObserver.asObservable() 
        // this.MediaObserver.subscribe((change: MediaChange) => {
        //     if ( this.activeMediaQuery !== change.mqAlias )
        //     {
        //         this.activeMediaQuery = change.mqAlias;
        //         this.onMediaChange.emit(change.mqAlias);
        //     }
        // });
    }
}
