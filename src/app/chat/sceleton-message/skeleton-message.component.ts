
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-message',
  templateUrl: './skeleton-message.component.html',
  styleUrls: ['./skeleton-message.component.scss'],
})
export class SkeletonMessageComponent  implements OnInit {

  @Input() isSender: boolean = false;

  @Input() version: number = 0;

  public text: Array<string> = [];

  constructor() { }

  ngOnInit() {
  }
}
