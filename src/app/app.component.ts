import { Component, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  public isConnected: boolean = true;

  constructor() {}

  ngOnInit(): void {
    Network.getStatus().then((status) => {
      console.log('Network status', status);
      this.isConnected = status.connected;
    });
    
    Network.addListener('networkStatusChange', (status) => {
      if (status.connected && !this.isConnected) {
        window.location.reload();
      }
      this.isConnected = status.connected;

    });

  }
}
