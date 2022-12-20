import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user.entity';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { jwtConstants } from '../constants';
import { UserDto } from '../user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async signup(user: UserDto): Promise<Users> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return await this.userRepository.save(user);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const foundUser = await this.userRepository.findOne({ username });
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { password, ...result } = foundUser;
        return result;
      }

      return null;
    }
    return null;
  }
  async login(user: UserDto) {
    const validUser = await this.validateUser(user.username, user.password);
    if (validUser) {
      return {
        access_token: sign(
          { username: validUser.username, id: validUser.id },
          jwtConstants.secret,
        ),
      };
    }
    throw new UnauthorizedException();
  }
}
