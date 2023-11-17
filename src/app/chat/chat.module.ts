import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatPage } from './chat.page';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonicModule } from '@ionic/angular';
import { MessageComponent } from './message/message.component';


@NgModule({
  declarations: [ChatPage, MessageComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    IonicModule,
  ]
})
export class ChatModule { }
