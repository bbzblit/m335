import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Message } from '../model/message.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MessageService } from '../service/message.service';
import { RealtimeChannel } from '@supabase/supabase-js';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage  implements OnInit {

  public messages: Array<Message> = [];

  private messageSubscription$: RealtimeChannel | undefined;
  
  constructor(private messageService: MessageService, private cd: ChangeDetectorRef) {}

  messageChange(payload: any) {
    if(payload.eventType === 'INSERT') {
      this.messages.push(payload.new);
    }
    else if(payload.eventType === 'UPDATE') {
      const index = this.messages.findIndex((message) => message.id === payload.new.id);
      this.messages[index] = payload.new;
    }
    else if(payload.eventType === 'DELETE') {
      const index = this.messages.findIndex((message) => message.id === payload.old.id);
      this.messages.splice(index, 1);
    }
  }

  ngOnInit() {
    this.messageService.getMessages(1).then((data) => {
      if (data) {
        this.messages = data;
      }
    });

    this.messageSubscription$ = this.messageService.subscribeMessages(1, (payload) => this.messageChange(payload));

  }



}
