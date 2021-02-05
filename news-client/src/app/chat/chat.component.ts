import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  title = 'app';
  incomingmsg = [];
  msg = 'First Protocol';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getMessage().subscribe((msg) => {
      console.log('Incoming msg', msg);
    });
    this.sendMsg(this.msg);
  }

  sendMsg(msg: any) {
    console.log('sdsd', msg);
    this.chatService.sendMessage(msg);
  }
}
