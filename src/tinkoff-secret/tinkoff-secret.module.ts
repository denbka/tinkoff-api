import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { TinkoffSecretController } from './tinkoff-secret.controller';
import { TinkoffSecret } from './tinkoff-secret.model';
import { TinkoffSecretService } from './tinkoff-secret.service';

@Module({
  controllers: [TinkoffSecretController],
  providers: [TinkoffSecretService],
  imports: [
    SequelizeModule.forFeature([TinkoffSecret, User]),
    AuthModule,
    UsersModule,
  ],
  exports: [
    SequelizeModule,
    TinkoffSecretService
  ]
})
export class TinkoffSecretModule {}
