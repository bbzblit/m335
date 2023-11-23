import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async getCurrentPosition() {
    let { coords } = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
    return coords;
  }
}
