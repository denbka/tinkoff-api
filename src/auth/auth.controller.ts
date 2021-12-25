import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { VkDto } from 'src/users/dto/vk-auth.dto';
import { User } from 'src/users/users.model';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    return await this.authService.login(userDto)
  }

  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto)
  }

  @Post('/vk')
  async vkAuth(@Body() vkDto: VkDto) {
    return await this.authService.authByVk(vkDto)
  }
}
