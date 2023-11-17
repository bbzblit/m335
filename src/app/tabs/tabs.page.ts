import { Component, OnInit } from '@angular/core';
import { BrodcastService } from '../service/brodcast.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  showTabs = true;

  constructor(private broadcastService: BrodcastService) { }

  ngOnInit(): void {
    this.broadcastService.register('showTabs', (val: any) => {
      this.showTabs = val;
    });
  }

}
