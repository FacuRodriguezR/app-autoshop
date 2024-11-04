import { Injectable } from '@angular/core';
import { Coupon } from '../models/coupon';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';

@Injectable({providedIn: 'root'})
export class CouponsService {
    constructor() { }
    

    getCoupons() {
        return fetch('./assets/data/data.json').then(async res=>{
         const coupons: Coupon[] = await res.json() as Coupon[];
          coupons.forEach(c => c.active = false)
         return Promise.resolve(coupons);
        }).catch(err => {
          console.log(err);
          return Promise.reject([])
        })
      }
    
    
      async getAs(nombre: string){
        const options: HttpOptions = {
          url: 'https://api.redautoshop.com.ar/articulos-view/',
          params: {
          
          },
        }
    
        const response = await CapacitorHttp.get(options);
        return response.data;
      }
    
}