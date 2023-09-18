import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/src/service/user.service';
import { RedisService } from '@/src/service/redis.service';

const moment = require('moment')
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly redisService: RedisService
  ) {}

  async login(username) {
    const userInfo = await this.userService.findUserInfo({ username });
    const tokenInfo = this.createToken({ id: userInfo.id});
    const lastLogin = moment().valueOf();
    this.userService.update(userInfo.id,{ last_login: lastLogin })
    userInfo.last_login = lastLogin
    this.redisService.getRedis().setex(tokenInfo.token,86400,userInfo.id)
    return { data: { user_info: userInfo, token_info: tokenInfo } }
  }

  createToken({ id }) {
    const token = this.jwtService.sign({ id });
    return { token }
  }

//   recordLogin(user: User) {
//     const { id } = user;
//     return this.userService.recordLogin(id);
//   }
}