import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException, HttpStatus } from'@nestjs/common';
import { validate } from'class-validator';
import { plainToClass } from'class-transformer';
import { ApiException } from '../filters/http-exception/api-exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(`value:`, value, 'metatype: ', metatype);
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    const errors = await validate(object,{ transform: true, whiteLists: true });
    //console.log(errors);
    if (errors.length > 0) {
        // 获取到第一个没有通过验证的错误对象
        let error = errors.shift();
        let constraints = error.constraints
        let contexts = error.contexts
        
        // 将未通过验证的字段的错误信息和状态码，以ApiException的形式抛给我们的全局异常过滤器
        for (let key in constraints) {
          throw new ApiException(constraints[key], contexts[key].errorCode, HttpStatus.BAD_REQUEST);
        }

    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}