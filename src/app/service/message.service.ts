import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages: string[] = [];

  constructor() { }

  add(msg: string): void{
    this.messages.push(msg);
  }

  clear(): void{
    this.messages = [];
  }

}
