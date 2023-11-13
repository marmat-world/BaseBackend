import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get
} from "@nestjs/common";
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from "@/src/common/strategy/guards/local-auth.guard";
import { AuthService } from "@/src/service/auth.service";
import { CreateLoginDto } from "@/src/dto/create-login.dto";
import { ApiDataResponse } from '@/src/decorators/ApiDataResponse';

@ApiTags('登录菜单')
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @UseGuards(LocalAuthGuard)
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


  @Get('/getAsyncRoutes')
  @ApiOperation({
    summary: '获取模块详情'
  })
  async getAsyncRoutes() {
    return {
      data: [{
        path: "/permission",
        meta: {
          title: "权限管理",
          icon: "lollipop",
          rank: 10
        },
        children: [
          {
            path: "/permission/page/index",
            name: "PermissionPage",
            meta: {
              title: "页面权限",
              roles: ["admin", "common"]
            }
          },
          {
            path: "/permission/button/index",
            name: "PermissionButton",
            meta: {
              title: "按钮权限",
              roles: ["admin", "common"],
              auths: ["btn_add", "btn_edit", "btn_delete"]
            }
          }
        ]
      }]
      , message: '获取成功'
    }
  }
}