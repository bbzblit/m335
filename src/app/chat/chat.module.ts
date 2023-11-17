import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatPage } from './chat.page';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [ChatPage],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    IonicModule,
  ]
})
export class ChatModule { }
