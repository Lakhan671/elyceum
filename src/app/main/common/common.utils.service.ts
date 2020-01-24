import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class CommonUtilsService {
   constructor(private datePipe: DatePipe){
       
   }
    
   public getDateFormat(date:any,formate:string){
    return this.datePipe.transform(date,formate);

    }

}