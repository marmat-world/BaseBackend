import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((query, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return request.user_verify_info;
});

export const AuthToken = createParamDecorator((query, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  const authorization = request['headers'].authorization || void 0;
  const token = authorization.split(' ')[1]; // authorization: Bearer xxx
  return token
})

/**
 * 定义当前用户的数据类型
 */
export interface CurrentUserType {
  id: number;
  username: string;
  last_login: number;
  avatar: string;
}