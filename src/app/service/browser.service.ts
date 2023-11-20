import { Injectable } from '@angular/core';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor() { }

  open(url: string) {
    Browser.open({ url: url, presentationStyle: 'fullscreen', toolbarColor: '#ffffff', windowName: 'Follow Yanni8 on GitHub' });
  }

} 
