import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public username: string = "";

  private _notifications: boolean = true;
  private _useBrowser: boolean = true;
  private _browserColor: string = "#000000";

  constructor(
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.storageService.get('notifications').then((val) => {
      if (val != null) {
        this._notifications = val == "true";
      }
    });

    this.storageService.get('useBrowser').then((val) => {
      if (val != null) {
        this._useBrowser = val == "true";
      }
    });

    this.storageService.get('browserColor').then((val) => {
      if (val != null) {
        this._browserColor = val;
      }
    });

    this.storageService.get('username').then((val) => {
      if (val != null) {
        this.username = val;
      }
    });
  }

  get notifications() {
    return this._notifications;
  }

  set notifications(value) {
    this._notifications = value;
    this.storageService.set('notifications', value.toString());
  }

  get useBrowser() {
    return this._useBrowser;
  }

  set useBrowser(value) {
    this._useBrowser = value;
    this.storageService.set('useBrowser', value.toString());
  }


  get browserColor() {
    return this._browserColor;
  }

  set browserColor(value) {
    this._browserColor = value;
    this.storageService.set('browserColor', value);
  }

  logout() {
    Preferences.remove({ key: 'username' });
    Preferences.remove({ key: 'userId' });
    window.location.reload();
  }

}
