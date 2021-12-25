import { Injectable } from '@nestjs/common';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';
const OpenAPI = require('@tinkoff/invest-openapi-js-sdk');
import { MarketInstrument } from '@tinkoff/invest-openapi-js-sdk';
import { Socket } from 'dgram';
import { AppGateway } from 'src/gateway/app.gateway';

@Injectable()
export class MarketService {
  private api;
  constructor() {
    this.api = new OpenAPI({
      apiURL: process.env.TINKOFF_API_URL || '',
      secretToken: (process.env.TINKOFF_API_TOKEN as string) || '',
      socketURL: process.env.TINKOFF_API_SOCKET_URL || '',
    });
  }

  public async getFigi() {
    const marketInstrument = (await this.api.searchOne({
      ticker: 'SAVA',
    })) as MarketInstrument;
    const { figi }: MarketInstrument = marketInstrument;
    return figi;
  }

  public async getInstrumentByTicker(emit, figi) {
    this.api.orderbook({ figi, depth: 10 }, (x) => {
      console.log(x);
      emit(x);
    });
  }

  // @SubscribeMessage('msgToServer')
  // handleMessage(client: Socket, payload: string): void {
  //   console.log(1232);
  //   this.server.emit('msgToClient', payload);
  // }
}
