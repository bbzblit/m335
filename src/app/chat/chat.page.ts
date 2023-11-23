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
import { ChatService } from '../service/chat.service';
import { HammerGestureConfig } from '@angular/platform-browser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public messages: Array<Message> = [];
  public currentUser: UserModel | undefined;
  public isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private storageService: StorageService) { }



  login(username: string) {
    this.userService.login(username).then((user) => {
      if (user) {
        this.currentUser = user;
        this.storageService.set('userId', user.id.toString());
      }
      this.isLoading = false;
    });
    this.storageService.set('username', username); 
  }

  ngOnInit() {
    this.isLoading = true;
 
    this.storageService.get('username').then((username) => {
      if (username) {
        this.login(username);
      } else{
        this.isLoading = false;
      }
    });
  }
 
}
