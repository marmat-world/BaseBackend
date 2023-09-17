import { RedisService } from '@/src/service/redis.service';
import { CanActivate, ExecutionContext, Injectable, Controller } from '@nestjs/common';
import { ApiException } from "@/src/common/http-exception/api-exception";
import { ApiErrorCode } from "@/src/common/api-error-code.enum";

@Injectable()
@Controller()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService 
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const authorization = request['headers'].authorization || void 0;
    const token = authorization.split(' ')[1];
    if( !token ){
      throw new ApiException('缺少token',ApiErrorCode.TOKEN_INVALID);
    }
    const userId = await this.redisService.getRedis().get(token);
    if( !userId ){
      throw new ApiException('token无效',ApiErrorCode.TOKEN_INVALID);
    }
    request['user_verify_info'] = {
      userId,
      token
    } 
    return true; 
  }
}