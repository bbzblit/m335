import { Component, Input, OnInit } from '@angular/core';
import { User } from '@supabase/supabase-js';
import { Chat } from 'src/app/model/chat.model';
import { UserModel } from 'src/app/model/user.model';

@Component({
  selector: 'app-chat-selector',
  templateUrl: './chat-selector.component.html',
  styleUrls: ['./chat-selector.component.scss'],
})
export class ChatSelectorComponent  implements OnInit {

  @Input() chats: Array<Chat> = [];
  @Input() currentUser: UserModel | undefined;

  constructor() { }

  ngOnInit() {}

  openChat(chat: Chat) {
    console.log(chat);
  }

}
