import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { Config } from '../../models/order-book.models';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})

export class OrderBookComponent implements OnInit, OnDestroy {

  ioConnect: any;
  items: Array<any> = [];
  changesQueue: Array<any> = [];
  queueSize = 60;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.initConnect();
  }

  private initConnect(): void {
    this.webSocketService.initWSocket();
    this.webSocketService.messages.subscribe(data => {
      this.addChanges(data);
      this.sortByPrice(this.changesQueue);
    });

    this.webSocketService.sendMessage(Config.subscribeMsg);
  }

  private sortByPrice(arr): void {
    const tmpArr = arr.map((item) => item).sort((a, b) => (a.price < b.price) ? 1 : -1);
    this.items = tmpArr.map((item) =>
    `  ${item.side} | ${item.price.toFixed(2).padStart(12)} | ${parseFloat(item.size).toFixed(8).padStart(16)}`);
  }

  private addChanges(data): void {
    if (this.changesQueue.length >= this.queueSize) {
      this.changesQueue.shift();
    }
    const fetchItem = arr => [
      {
        side: arr[0],
        price: parseFloat(arr[1]),
        size: arr[2]
      }
    ];

    this.changesQueue = [...this.changesQueue, ...fetchItem(data)];
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

}
