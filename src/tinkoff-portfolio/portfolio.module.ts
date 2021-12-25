import { Module } from '@nestjs/common';
import { SandboxService } from './portfolio.service';
import { SandboxController } from './portfolio.controller';
import { TinkoffSecretModule } from 'src/tinkoff-secret/tinkoff-secret.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { TinkoffBrokerAccountModule } from 'src/tinkoff-account/tinkoff-account.module';

@Module({
  controllers: [SandboxController],
  providers: [SandboxService],
  imports: [
    TinkoffSecretModule,
    TinkoffBrokerAccountModule,
    UsersModule,
    AuthModule
  ]
})
export class TinkoffPortfolioModule {}
