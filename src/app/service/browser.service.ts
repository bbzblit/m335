import { Injectable, ViewChild } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { StorageService } from './storage.service';
import { isClassInstance } from '@ngrx/effects/src/utils';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(
    private storeageService: StorageService
  ) { }

  open(url: string) {
    this.storeageService.get("useBrowser").then((useBrowser) => {

      if (useBrowser == "false") {
        window.open(url, "_blank");
        return;
      }

      this.storeageService.get("browserColor").then((color) => {
        if(!color){
          color = "#4287f5";
        }  
        Browser.open({ url: url, presentationStyle: 'fullscreen', toolbarColor: '#4287f5', windowName: '_blank' });
      });
    });
  }

} 
