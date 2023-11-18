import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPage } from './chat.page';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [{
  path: "",
  component: ChatPage
},
{
  path: ":id",
  component: ChatComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
