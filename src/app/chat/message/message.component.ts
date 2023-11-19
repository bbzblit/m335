import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent  implements OnInit {

  @Input() isSender: boolean = false;
  @Input() message: Message  | undefined = undefined;

  constructor() { }

  ngOnInit() {}

}
