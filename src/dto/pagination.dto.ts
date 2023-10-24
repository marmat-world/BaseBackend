import { ApiErrorCode } from '@/src/common/api-error-code.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginationDto {

    @ApiProperty({ description: '每页数量' })
    @IsNumber({},{ message: 'pageSize必须为数字', context: { errorCode: ApiErrorCode.PARAM_ERROR} })
    @Transform(({ value }) => Number(value))
    pageSize: number = 10

    @ApiProperty({ description: '当前页' })
    @IsNumber({},{ message: 'current必须为数字', context: { errorCode: ApiErrorCode.PARAM_ERROR} })
    @Transform(({ value }) => Number(value))
    @Min(1,{ message: 'current最小值为1', context: { errorCode: ApiErrorCode.PARAM_ERROR} })
    current: number = 1

}