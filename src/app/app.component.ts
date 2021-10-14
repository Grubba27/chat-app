import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketIoService} from "./socket-io.service";
import {Message} from "./message";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'chat-app';
  nickname: string = '';
  message: string = '';
  messagesArray: Message[] = [];
  private subsMessages: any;


  constructor(private socketService: SocketIoService) {
  }

  ngOnInit(){
   this.subsMessages =  this.socketService.messages().subscribe( (m: Message) => {
      console.log(m);
      this.messagesArray.push(m)
    })
  }

  send = () => {
    this.socketService.send({
      from: this.nickname,
      message: this.message
    });
    this.message = '';
  }

  ngOnDestroy() {
    this.subsMessages.unsubscribe();
  }
}
