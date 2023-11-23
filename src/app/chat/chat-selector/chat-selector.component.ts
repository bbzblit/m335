import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RealtimeChannel } from '@supabase/supabase-js';
import { Chat } from 'src/app/model/chat.model';
import { UserModel } from 'src/app/model/user.model';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-chat-selector',
  templateUrl: './chat-selector.component.html',
  styleUrls: ['./chat-selector.component.scss'],
})
export class ChatSelectorComponent implements OnInit, OnDestroy {

  @Input() currentUser: UserModel | undefined;

  public _username: string = '';
  public users: Array<UserModel> = [];
  public chats: Array<Chat> = [];

  public selectedChat: {chat: Chat, username: string} | undefined;

  private chatSubscription$: RealtimeChannel | undefined;

  constructor(private router: Router, private userService: UserService, private chatService: ChatService) { }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
    this.userService.findUserByUsername(this._username).then((users) => {
      this.users = users || [];
    });
  }

  ngOnInit() {
    this.userService.findUserByUsername('').then((users) => {
      this.users = users || [];
    });

    this.syncChats();

    this.chatSubscription$ = this.chatService.subscribeChatsOfUser(this.currentUser!.id, ({chat, isDelete}) => {
      this.chats = this.chats.filter((_chat) => _chat.id !== chat.id);
      if(!isDelete){
        this.chats.push(chat);
      }
    });

  }

  ngOnDestroy(): void {
    this.chatSubscription$?.unsubscribe();
  }

  private syncChats() {
    this.chatService.getAllChatsOfUser(this.currentUser!.id).then((data) => {
      if (data) {
        this.chats = data;
      }
    });
  }

  openChat(chat: Chat) {
    this.router.navigate(['/chat', chat.id]);
  }

  addNewChat(user: UserModel) {
    this.chatService.createChat(this.currentUser!.id, user.id).then((data) => {
      if(data){
        this.router.navigate(['/chat', data.id]);
      }
    });
  }

  initDeleteChat(chat: Chat) {
    this.selectedChat = {
      chat: chat,
      username: chat.user_a.id === this.currentUser!.id ? chat.user_b.username : chat.user_a.username
    };
  }

  deleteConfirmationCallback(action: any) {
    if(action.detail.role !== 'cancel'){
      this.chatService.deleteChat(this.selectedChat!.chat.id);
    } 
    this.selectedChat = undefined;

  }

}
