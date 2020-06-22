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
