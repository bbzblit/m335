import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrodcastService {

  private cb: Map<string, Array<(val: any) => void>> = new Map<string, Array<(val: any) => void>>();

  constructor() { }

  public register(key: string, callback: (val: any) => void){
    if(this.cb.has(key)){
      this.cb.get(key)?.push(callback); 
    }
    else{
      this.cb.set(key, [callback]);
    }
  }

  public unregister(key: string, callback: (val: any) => void){
    if(this.cb.has(key)){
      let arr = this.cb.get(key);
      if(arr){
        let index = arr.indexOf(callback);
        if(index > -1){
          arr.splice(index, 1);
        }
      }
    }
  }

  public broadcast(key: string, val: any){
    if(this.cb.has(key)){
      this.cb.get(key)?.forEach((callback) => {
        callback(val);
      });
    }
  }
}
