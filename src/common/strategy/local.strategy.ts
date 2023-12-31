import { MemberService } from '@/src/service/member.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Controller } from '@nestjs/common';

@Injectable()
@Controller()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly memberService: MemberService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.memberService.validateUser({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}