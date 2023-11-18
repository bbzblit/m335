import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public _notifications: boolean = true;


  constructor(
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.storageService.get('notifications').then((val) => {
      if (val != null) {
        this._notifications = val == "true";
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

}
