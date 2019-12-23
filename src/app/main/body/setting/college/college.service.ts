import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {WebserModel} from '../../../../navigation/WebService'
@Injectable()
export class CollegeSettingService implements Resolve<any>
{
    routeParams: any;
    product: any;
    onProductChanged: BehaviorSubject<any> = new BehaviorSubject({});
ModelData :any;
    constructor(
        private http: HttpClient,
        private webModel:WebserModel
    )
    {
        this.ModelData = this.webModel.Sevice;
    }

    /**
     * Resolve
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {

        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                // this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    getProduct(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            // if ( this.routeParams.id === 'new' )
            // {
            //     this.onProductChanged.next(false);
            //     resolve(false);
            // }
            // else
            // {
                var data ={
                    tokenId:this.getTokken
                }
                this.http.post(this.ModelData.BASE_URL + this.ModelData.GET_COLLEGE_DETAIL,data)
                    .subscribe((response: any) => {
                        this.product = response;
                        this.onProductChanged.next(this.product);
                        resolve(response);
                    }, reject);
            // }
        });
    }
    getCollegeDetail(){
        var data ={
            tokenId:this.getTokken
        }
         return new Promise((resolve, reject) => {
            this.http.post(this.ModelData.BASE_URL + this.ModelData.GET_COLLEGE_DETAIL,data)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    
    }
    

    saveCollege(data)
    {
        data.tokenId = this.getTokken
        return new Promise((resolve, reject) => {
            this.http.post(this.ModelData.BASE_URL + this.ModelData.GET_COLLEGE_UPDATE,data)
            .subscribe((response: any) => {
                resolve(response);
            }, reject);
        });
    }
    get getTokken(){
        return window.sessionStorage.getItem(this.ModelData.TOKKEN_KEY)
    }
}
