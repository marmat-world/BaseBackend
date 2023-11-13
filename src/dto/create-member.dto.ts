import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsAlpha, IsString,IsInt,MaxLength, ValidateIf } from 'class-validator';
import {ApiErrorCode} from "@/src/common/api-error-code.enum"

export class CreateMemberDto {
    
    @ApiProperty({ example: 'admin', description: '用户名' })
    @IsNotEmpty({ message: '请填写用户名', context: { errorCode: ApiErrorCode.PARAM_ERROR } })
    username: string;

    @ApiProperty({ example: '123456', description: '密码' })
    @IsNotEmpty({ message: '请输入密码', context: { errorCode: ApiErrorCode.PARAM_ERROR} })
    password: string;

}