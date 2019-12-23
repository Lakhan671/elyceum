import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FuseShortcutsComponent } from './shortcuts.component';
import { SharedModule } from '../../modules/shared.module';
import {ShortcutService} from './shortcutwebservice';
@NgModule({
    declarations: [
        FuseShortcutsComponent
    ],
    imports     : [
        SharedModule,
        RouterModule, HttpClientModule
    ],
    exports     : [
        FuseShortcutsComponent
    ],    providers   : [ ShortcutService

    ],


    })
export class FuseShortcutsModule {
}
