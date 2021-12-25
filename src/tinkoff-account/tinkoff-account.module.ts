import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { TinkoffBrokerAccountController } from './tinkoff-account.controller';
import { TinkoffBrokerAccount } from './tinkoff-account.model';
import { BrokerAccountService } from './tinkoff-account.service';

@Module({
  controllers: [TinkoffBrokerAccountController],
  providers: [BrokerAccountService],
  imports: [
    SequelizeModule.forFeature([TinkoffBrokerAccount, User]),
    AuthModule,
    UsersModule,
  ],
  exports: [
    SequelizeModule,
    BrokerAccountService
  ]
})
export class TinkoffBrokerAccountModule {}
