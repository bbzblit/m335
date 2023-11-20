import { HtmlParser } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message.model';
import { BrowserService } from 'src/app/service/browser.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent  implements OnInit {

  @Input() isSender: boolean = false;
  @Input() message: Message  | undefined = undefined;

  public text: Array<string> = [];

  constructor(
    private browserService: BrowserService
  ) { }

  ngOnInit() {

    this.text = this.message?.text.split(/(?: ?)(https?:\/\/(?:\S+\/?)+)(?: ?)/ ) || [];
  }

  open(link: string){
    if(link.startsWith('https://') || link.startsWith('http://')){
      this.browserService.open(link);
    }
  }
}
