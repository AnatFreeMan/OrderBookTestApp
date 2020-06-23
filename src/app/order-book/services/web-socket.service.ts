import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Subject } from 'rxjs';
import { Config } from '../models/order-book.models';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  private websocket: WebSocketSubject<any>;
  private websocketSubject$ = new Subject();
  public messages = this.websocketSubject$.asObservable();

  public initWSocket(): void {
    this.websocket = webSocket(Config.WS_URL);

    this.websocket.subscribe(
      (msg) => {
        if (msg.changes) {
          this.websocketSubject$.next(msg.changes[0]);
        }
      },
      err => console.log(err),
      () => console.log('complete')
    );
  }

  public close() {
    this.websocket.complete();
  }

  public sendMessage(msg: object) {
    this.websocket.next(msg);
  }

}
