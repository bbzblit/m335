import { Injectable } from '@angular/core';
import { Clipboard } from '@capacitor/clipboard';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {

  constructor() { }

  async writeText(text: string) {
    await Clipboard.write({
      string: text
    });
  }

}
