import { Component, OnInit } from '@angular/core';
 import { fuseAnimations } from '../../../../../../core/animations';

@Component({
    selector   : 'fuse-profile-timeline',
    templateUrl: './timeline.component.html',
    styleUrls  : ['./timeline.component.scss'],
    animations : fuseAnimations
})
export class FuseProfileTimelineComponent implements OnInit
{
    timeline: any;

    constructor( )
    {
        // this.profileService.timelineOnChanged.subscribe(timeline => {
        //     this.timeline = timeline;
        // });
    }

    ngOnInit()
    {

    }
}
