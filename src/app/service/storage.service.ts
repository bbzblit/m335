import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set(key: string, value: string) {
    Preferences.set({
      key: key,
      value: value
    });
  }

  async get(key: string) {
    const { value } = await Preferences.get({ key: key });
    return value;
  }

}
