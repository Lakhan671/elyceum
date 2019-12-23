import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '../../../core/services/config.service';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../core/animations';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.scss'],
  animations : fuseAnimations
  
})
export class AcademicsComponent implements OnInit {

  constructor(private translationLoader: FuseTranslationLoaderService,      private fuseConfig: FuseConfigService) { 
    this.fuseConfig.setSettings({
    layout: {
        navigation: 'top',
    toolbar   : 'above',
       footer    : 'none'
    }
});
}

  ngOnInit() {
  }

}
