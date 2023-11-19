import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealtimeChannel, Subscription, User } from '@supabase/supabase-js';
import { Chat } from 'src/app/model/chat.model';
import { Message } from 'src/app/model/message.model';
import { BrodcastService } from 'src/app/service/brodcast.service';
import { ChatService } from 'src/app/service/chat.service';
import { MessageService } from 'src/app/service/message.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {

  public messages: Array<Message> = [];
  public username: string = '';
  public userId: number = 0;
  public currentChat: Chat | undefined = undefined;
  public opositeUser: string = '';
  public message: string = '';


  private messageSubscription$: RealtimeChannel | undefined;

  constructor(
    private chatService: ChatService,
    private storageService: StorageService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private brodcastService: BrodcastService,
  ) { }

  ngOnInit() {
    this.brodcastService.broadcast('showTabs', false);

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id === null) {
      return;
    }

    this.messageService.getMessages(+id).then((data) => {
      if (data) {
        this.messages = data;
      }
    });

    this.storageService.get('username').then((data) => {
      if (data) {
        this.username = data;
      }
    });

    this.storageService.get('userId').then((data) => {
      if (data !== null) {
        this.userId = +data;
      }
    });

    this.chatService.getChatById(+id).then((data) => {
      if (data) {
        this.currentChat = data;
        this.syncUser();
      }
    });
    this.messageSubscription$ = this.messageService.subscribeMessages(1, (payload) => this.messageChange(payload));

  }


  ngOnDestroy(): void {
    this.brodcastService.broadcast('showTabs', true);
    this.messageSubscription$?.unsubscribe();
  }

  syncUser() {
    if (this.currentChat?.user_a.username === this.username) {
      this.opositeUser = this.currentChat.user_b.username;
    } else {
      this.opositeUser = this.currentChat?.user_a.username || "";
    }
  }

  messageChange(payload: any) {
    console.log(payload);
    if (payload.eventType === 'INSERT') {
      this.messages.push(payload.new);
    }
    else if (payload.eventType === 'UPDATE') {
      const index = this.messages.findIndex((message) => message.id === payload.new.id);
      this.messages[index] = payload.new;
    }
    else if (payload.eventType === 'DELETE') {
      const index = this.messages.findIndex((message) => message.id === payload.old.id);
      this.messages.splice(index, 1);
    }
  }


  sendMessage() {
    if (this.message === '' || this.currentChat === undefined) {
      return;
    }

    let newMessage = {
      author: this.userId,
      chat: this.currentChat.id,
      text: this.message,
    };

    this.messageService.sendMessage(newMessage).then((data) => {console.log(data)});
    this.message = '';
  }

}
