import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class WebSocketService {
  public socket: any;

  constructor() {
    this.socket = io('http://localhost:3001');
  }
}
