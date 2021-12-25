import { Module } from '@nestjs/common';
import { AppGateway } from 'src/gateway/app.gateway';
import { MarketService } from 'src/services/market.service';

@Module({
  providers: [MarketService],
  exports: [MarketService],
})
export class MarketModule {}
