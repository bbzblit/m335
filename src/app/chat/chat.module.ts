import { Injectable, NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatPage } from './chat.page';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonicModule } from '@ionic/angular';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';
import { ChatSelectorComponent } from './chat-selector/chat-selector.component';
import { HAMMER_GESTURE_CONFIG,  HammerGestureConfig,  HammerModule } from '@angular/platform-browser';


@NgModule({
  declarations: [ChatPage, MessageComponent, ChatComponent, ChatSelectorComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    IonicModule,
    HammerModule
  ]
})
export class ChatModule { }
