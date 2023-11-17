import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Message } from '../model/message.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MessageService } from '../service/message.service';
import { RealtimeChannel, User } from '@supabase/supabase-js';
import { UserService } from '../service/user.service';
import { UserModel } from '../model/user.model';
import { StorageService } from '../service/storage.service';
import { BrodcastService } from '../service/brodcast.service';
import { Chat } from '../model/chat.model';
import { privateDecrypt } from 'crypto';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public messages: Array<Message> = [];
  public currentUser: UserModel | undefined;
  public chats: Array<Chat> = [];


  private messageSubscription$: RealtimeChannel | undefined;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private storageService: StorageService,
    private broadcastService: BrodcastService,
    private cd: ChangeDetectorRef,
    private chatService: ChatService) { }


  messageChange(payload: any) {
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

  login(username: string) {
    this.userService.login(username).then((user) => {
      if (user) {
        this.currentUser = user;
        this.chatService.getAllChatsOfUser(user.id).then((data) => {
          if (data) {
            this.chats = data;
          }
        });
      }
    });
    this.storageService.set('username', username); 
  }

  ngOnInit() {
    this.messageService.getMessages(1).then((data) => {
      if (data) {
        this.messages = data;
      }
    });

    this.messageSubscription$ = this.messageService.subscribeMessages(1, (payload) => this.messageChange(payload));

    this.storageService.get('username').then((username) => {
      if (username) {
        this.login(username);
      }
    });
  }

  logout() {
    this.currentUser = undefined;
  }



}
