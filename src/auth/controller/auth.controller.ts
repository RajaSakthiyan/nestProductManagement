import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Users } from '../user.entity';
import { UserDto } from '../user.dto';

@Controller('v1/auth/')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post('register')
  async signup(@Body() user: UserDto): Promise<Users> {
    return this.usersService.signup(user);
  }

  @Post('login')
  async login(@Body() user: UserDto) {
    return this.usersService.login(user);
  }
}
