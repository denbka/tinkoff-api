import { Injectable, Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MarketService } from 'src/services/market.service';
import { io, Socket } from 'socket.io-client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private marketService: MarketService) {}

  @WebSocketServer()
  server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('events')
  async handleMessage(_, payload: string): Promise<void> {
    console.log('init local ws');

    const socketIo = io(process.env.TINKOFF_API_SOCKET_URL, {
      query: {
        figi: 'BBG0013HGFT4',
        interval: '5min',
      },
    });
    console.log('on connection');
    const figi = await this.marketService.getFigi();
    this.marketService.getInstrumentByTicker(
      (payload) => this.server.emit('sendTickerData', payload),
      figi,
    );
    // socketIo.on('candle:subscribe', (body) => {
    //   console.log(body);
    // });
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
