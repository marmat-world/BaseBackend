import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsAlpha, IsString,IsInt,MaxLength, ValidateIf } from 'class-validator';
import {ApiErrorCode} from "@/src/common/api-error-code.enum"

export class BaseDto {
        
    @ApiProperty({example:[1,2,3,4,5],description: 'id的集合'})
    @ValidateIf((body) => !!body.ids)
    @IsNotEmpty({ message: '请传ids参数', context: { errorCode: ApiErrorCode.PARAM_ERROR } })
    ids: [];

    @ApiProperty({example:1,description: '状态参数'})
    @ValidateIf((body) => !!body.status)
    @IsNotEmpty({ message: '请传status', context: { errorCode: ApiErrorCode.PARAM_ERROR } })
    status: number;

}