import { ApiProperty } from '@nestjs/swagger';
import{ Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber} from 'class-validator';
import { ApiErrorCode } from '../common/api-error-code.enum';

export class FindOne {

    @ApiProperty({ description: '主键id' })
    @IsNotEmpty({ message: '请输入id' })
    @IsNumber({},{ message: 'id必须为数字', context: { errorCode: ApiErrorCode.PARAM_ERROR } })
    @Transform(({ value }) => Number(value))
    id: number
}