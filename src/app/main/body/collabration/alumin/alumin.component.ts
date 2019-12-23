import { fuseAnimations } from '../../../../core/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
  import {   MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FuseUtils } from '../../../../core/fuseUtils';
import { FuseConfigService } from '../../../../core/services/config.service';

@Component({
  selector: 'app-alumin',
  templateUrl: './alumin.component.html',
  styleUrls: ['./alumin.component.scss']
})
export class AluminComponent implements OnInit {

  constructor(private fuseConfig :FuseConfigService) { 
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
