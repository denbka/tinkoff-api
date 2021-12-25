import { forwardRef, Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './users.model'
import { UserRoles } from 'src/roles/user-roles.model'
import { Role } from 'src/roles/roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { AuthModule } from 'src/auth/auth.module'
import { TinkoffSecret } from 'src/tinkoff-secret/tinkoff-secret.model'
import { TinkoffBrokerAccount } from 'src/tinkoff-account/tinkoff-account.model'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, UserRoles, Role, TinkoffSecret, TinkoffBrokerAccount]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}
