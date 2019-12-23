import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { FuseProfileTimelineComponent } from './user-profile/tabs/timeline/timeline.component';
import { FuseProfileAboutComponent } from './user-profile/tabs/about/about.component';
import { FuseProfilePhotosVideosComponent } from './user-profile/tabs/photos-videos/photos-videos.component';
import {ContactDialogComponent} from '../dialog/profileDialog/contact-dialog/contact-dialog.component'
import {GeneralDialogComponent} from '../dialog/profileDialog/general-dialog/general-dialog.component'
import {WorkDialogComponent} from '../dialog/profileDialog/work-dialog/work-dialog.component'
import {MatGridListModule} from '@angular/material/grid-list';
import {PreviewdialogComponent} from '../dialog/previewdialog/previewdialog.component'

import { ImageCropperModule } from 'ngx-image-cropper';

const routes = [
    {
        path     : 'user',
        component: UserProfileComponent,
        
    }
];

@NgModule({
    entryComponents:[ContactDialogComponent,GeneralDialogComponent,WorkDialogComponent,PreviewdialogComponent],
    declarations: [
        UserProfileComponent,PreviewdialogComponent,
        FuseProfileTimelineComponent,
        FuseProfileAboutComponent,
        FuseProfilePhotosVideosComponent,ContactDialogComponent,GeneralDialogComponent,WorkDialogComponent
    ],
    imports     : [
        SharedModule,  ImageCropperModule,  AgmCoreModule.forRoot({
            apiKey: "AIzaSyD7PkRvZv2xOE_7v-AeUh_ZLdLpe00x1oU",
            libraries: ["places"]
          }),
      
        RouterModule.forChild(routes),MatGridListModule
    ],
    providers   : [
         
    ]
})
export class ProfileModule
{
}
