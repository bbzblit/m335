import { Injectable } from '@angular/core';
import { Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FilesystemService {

  constructor() { }

  public async readFile(path: string){
    return await Filesystem.readFile({
      path: path
    });
  }
}
