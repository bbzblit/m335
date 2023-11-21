import { Injectable, ViewChild } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(
    private storeageService: StorageService
  ) { }

  open(url: string) {
    this.storeageService.get("browserColor").then((color) => {
      if(!color){
        color = "#4287f5";
      }  
      Browser.open({ url: url, presentationStyle: 'fullscreen', toolbarColor: "#4287f5", windowName: 'Follow Yanni8 on GitHub' });
    });
  }

} 
