import { fuseAnimations } from '../../../../core/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import {   MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { FuseConfigService } from '../../../../core/services/config.service';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss'],
  animations   : fuseAnimations
})
export class GallaryComponent implements OnInit {

  constructor(private fuseConfig :FuseConfigService) { 
    this.fuseConfig.setSettings({
      layout: {
          navigation: 'top',
      toolbar   : 'above',
         footer    : 'none'
      }
  });

  }
  title = 'app';

  pictures = [
    {
      id: 1,
      title: 'A natural view',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/8V46UZCS0V.jpg'
    },
    {
      id: 2,
      title: 'Newspaper',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/LTLE4QGRVQ.jpg'
    },
    {
      id: 3,
      title: 'Favourite pizza',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/R926LU1YEA.jpg'
    },
    {
      id: 4,
      title: 'Abstract design',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/U9PP3KXXY2.jpg'
    },
    {
      id: 5,
      title: 'Tech',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/NO9CN3QYR3.jpg'
    },
    {
      id: 6,
      title: 'Nightlife',
      img: 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/X1UK6NLGRU.jpg'
    },
  ];

  ngOnInit() {
  }

}
