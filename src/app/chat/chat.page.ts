import { Component, OnInit } from '@angular/core';
import { Message } from '../model/message.model';
import { UserService } from '../service/user.service';
import { UserModel } from '../model/user.model';
import { StorageService } from '../service/storage.service';
import { Network } from '@capacitor/network';

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

      Network.getStatus().then((status) => {
        console.log('Network status', status);
        if (status.connected) {
          this.isLoading = false;
        }
      });
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
