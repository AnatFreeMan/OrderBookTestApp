import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { Config, Operation, IMessage } from '../../models/order-book.models';
import { map, scan, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})

export class OrderBookComponent implements OnInit, OnDestroy {

  public itemsBuy$: Observable<IMessage[]>;
  public itemsSell$: Observable<IMessage[]>;
  public items$: Observable<IMessage>;
  private itemsCount = 60;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.initConnect();
  }

  private initConnect(): void {
    this.webSocketService.initWSocket();

    this.items$ = this.webSocketService.messages
      .pipe(
        map(this.fetchItem)
      );

    this.itemsBuy$ = this.items$
      .pipe(
        filter(({type}) => type === Operation.BUY),
        scan((acc, val) => [...acc, val].slice(-this.itemsCount), []),
      );

    this.itemsSell$ = this.items$
      .pipe(
        filter(({type}) => type === Operation.SELL),
        scan((acc, val) => [...acc, val].slice(-this.itemsCount), []),
      );
    this.webSocketService.sendMessage(Config.subscribeMsg);
  }

  trackByIdx(i: number) {
    return i;
  }

  private fetchItem(data: string[]) {
    const [type, price, size] = data;

    return { type, price, size };
  }

  ngOnDestroy() {
    this.webSocketService.close();
  }

}
