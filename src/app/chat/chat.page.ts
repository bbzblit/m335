import { Component, OnInit } from '@angular/core';
import { Message } from '../model/message.model';
import { Store } from '@ngrx/store';
import { selectMessages } from '../state/message/message.selector';
import { fetchAllMessages } from '../state/message/message.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage  implements OnInit {

  public messages: Array<Message> = [];

  private messageSubscription$: Subscription;

  constructor(private store: Store) {
    
    this.store.dispatch(fetchAllMessages({chatId: 1}));
 
    this.messageSubscription$ = this.store.select(selectMessages).subscribe((messages) => {
      this.messages = messages;
    });

   }

  ngOnInit() {}

}
