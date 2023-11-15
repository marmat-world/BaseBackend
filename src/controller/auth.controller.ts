import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get
} from "@nestjs/common";
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AdminAuthGuard } from "@/src/common/strategy/guards/admin-auth.guard";
import { LocalStrategy } from '@/src/common/strategy/local.strategy';
import { AuthService } from "@/src/service/auth.service";
import { CreateLoginDto } from "@/src/dto/create-login.dto";
import { ApiDataResponse } from '@/src/decorators/ApiDataResponse';

@ApiTags('登录菜单')
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AdminAuthGuard)
  @Post("/admin/login")
  @ApiOperation({
    summary: '登录后台'
  })
  @ApiDataResponse({ type: CreateLoginDto })
  async loginAdmin(@Body() userParam: CreateLoginDto) {
    const { username } = userParam;
    const data = await this.authService.loginAdmin(username);
    // if (data) {
    //   await this.authService.recordLogin(request.user);
    // }
    return data;
  }

  @UseGuards(LocalStrategy)
  @Post("/login")
  @ApiOperation({
    summary: '登录'
  })
  @ApiDataResponse({ type: CreateLoginDto })
  async login(@Body() userParam: CreateLoginDto) {
    const { username } = userParam;
    const data = await this.authService.login(username);
    // if (data) {
    //   await this.authService.recordLogin(request.user);
    // }
    return data;
  }
  
}