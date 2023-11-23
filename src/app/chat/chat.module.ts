import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatPage } from './chat.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';
import { ChatSelectorComponent } from './chat-selector/chat-selector.component';
import { SkeletonMessageComponent } from './sceleton-message/skeleton-message.component';
import { HammerModule } from '@angular/platform-browser';


@NgModule({
  declarations: [ChatPage, MessageComponent, ChatComponent, ChatSelectorComponent, SkeletonMessageComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    IonicModule,
    HammerModule,
  ],
})
export class ChatModule { }
