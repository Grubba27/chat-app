import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client'
import {Message} from "./message";
import {Subject} from "rxjs";
import {io} from "socket.io-client";
@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  // TODO change this later
  url = 'https://poc-chat-app-grubba.herokuapp.com/';
  socket = io(this.url);
  subjectMessages: Subject<Message> = new Subject<Message>();

  constructor() {
    this.socket.on('message', (m: Message) => {
      this.subjectMessages.next(m);
    });
  }

   send = (msg: Message) => {
    this.socket.emit('message', msg)
   }

   messages = () => {
    return this.subjectMessages.asObservable();
   }
}
