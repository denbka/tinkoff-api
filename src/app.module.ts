import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { BriefcaseModule } from './briefcase/briefcase.module';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TinkoffSecretModule } from './tinkoff-secret/tinkoff-secret.module';
import * as path from 'path';
import { TinkoffSecret } from './tinkoff-secret/tinkoff-secret.model';
import { SandboxModule } from './sandbox/sandbox.module';
import { TinkoffBrokerAccountModule } from './tinkoff-account/tinkoff-account.module';
import { TinkoffBrokerAccount } from './tinkoff-account/tinkoff-account.model';
import { TinkoffPortfolioModule } from './tinkoff-portfolio/portfolio.module';
import { AppGateway } from './gateway/app.gateway';
import { MarketModule } from './modules/market.module';

@Module({
  controllers: [],
  providers: [AppGateway],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, TinkoffSecret, TinkoffBrokerAccount],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    BriefcaseModule,
    AuthModule,
    FilesModule,
    TinkoffSecretModule,
    TinkoffBrokerAccountModule,
    TinkoffPortfolioModule,
    SandboxModule,
    MarketModule,
  ],
})
export class AppModule {}
