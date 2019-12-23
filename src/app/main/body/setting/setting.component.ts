import { Component } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { FuseConfigService } from '../../../core/services/config.service';
import { fuseAnimations } from '../../../core/animations';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import {SettingService} from './setting.service'

@Component({
    selector   : 'app-fuse-setting',
    templateUrl: './setting.component.html',
    styleUrls  : ['./setting.component.scss'],
    animations : fuseAnimations
    
})
export class SettingComponent {
    constructor(private SettingService:SettingService,private translationLoader: FuseTranslationLoaderService,      private fuseConfig: FuseConfigService,
    )     {
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'top',
            toolbar   : 'above',
               footer    : 'none'
            }
        });
        this.translationLoader.loadTranslations(english, turkish);
    }
}
