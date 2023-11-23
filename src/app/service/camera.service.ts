import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { GeolocationService } from './geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private geolocationService: GeolocationService) { }

  public async takePicture(){
    const img = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    const coords = await this.geolocationService.getCurrentPosition();

    return {
      img: img.path,
      coords: coords
    };
  }

}
