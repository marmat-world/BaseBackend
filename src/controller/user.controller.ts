import { Controller, Get, Post, Body, Request, Query, Res, UseGuards } from '@nestjs/common';
import { UserService } from '@/src/service/user.service';
import { ApiDataResponse } from '@/src/decorators/ApiDataResponse';
import { CurrentUser } from '@/src/decorators/CurrentUserInfo';
import { ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import { CreateLoginDto } from "@/src/dto/create-login.dto";
import { FindOne } from "@/src/dto/find-one.dto";
import { ApiException } from "@/src/common/http-exception/api-exception";
import { AuthGuard } from '@/src/common/strategy/auth-token.strategy'
import { ApiErrorCode } from "@/src/common/api-error-code.enum";
import { RedisService } from '@/src/service/redis.service';

const moment = require('moment')
@ApiTags('用户模块')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService
  ) {}

  @Post('/addUser')
  @ApiOperation({
    summary: '新增用户'
  })
  @ApiDataResponse({ type: CreateLoginDto })
  async create(@Body() param: CreateLoginDto) {
    const data = await this.userService.create({ ...param, last_login: moment().valueOf() })
    return { data }
  }

  @UseGuards(AuthGuard)
  @Get('/getUser')
  @ApiOperation({
    summary: '用户信息'
  })
  @ApiDataResponse({ type: CreateLoginDto })
  async findOne(@CurrentUser() userInfo, @Query() param : FindOne) {
    const { id } = param;
    if( userInfo.userId !== id ){
      this.redisService.getRedis().del(userInfo.token);
      throw new ApiException('token错误',ApiErrorCode.TOKEN_INVALID);
    }
    const data = await this.userService.findUserInfo({ id })   
    return { data } 
  }


}
