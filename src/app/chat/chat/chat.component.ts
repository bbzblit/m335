import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {

  @Input() messages: Array<Message> = [];

  constructor() { }

  ngOnInit() {}

}
