export const Config = {
  WS_URL: 'wss://ws-feed.prime.coinbase.com',
  subscribeMsg: {
    type: 'subscribe',
    product_ids: [
        'ETH-USD'
    ],
    channels: [
        'level2'
    ]
  }
};

export enum Operation {
  SELL = 'sell',
  BUY = 'buy'
}

export interface IMessage {
  type: string;
  price: string;
  size: string;
}
