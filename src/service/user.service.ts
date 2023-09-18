import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import { CreateLoginDto } from "@/src/dto/create-login.dto";
import { ApiException } from '@/src/common/http-exception/api-exception';
import { ApiErrorCode } from '@/src/common/api-error-code.enum';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){
  }

  async validateUser(loginUserDto: CreateLoginDto) {
    const username = loginUserDto.username;
    const password = loginUserDto.password;

    if (_.isEmpty(username) || _.isEmpty(password)) {
      throw new ApiException('用户名或密码不能为空',ApiErrorCode.PARAM_ERROR);
    }
    // 默认为Entity的命名
    const user = await this.userRepository.createQueryBuilder().where({ username }).addSelect('User.password').getOne();
    if (user === null) {
      throw new ApiException('用户不存在',ApiErrorCode.PARAM_ERROR);
    }
    //console.log(user.password);
    const isValidPwd = await bcrypt.compare(password, user.password);
    if (!isValidPwd) {
      throw new ApiException('账号或密码错误',ApiErrorCode.PARAM_ERROR);
    }
    return user;
  }

  create(createUserDto) {
    const entityDto = this.userRepository.create(createUserDto)
    return this.userRepository.save(entityDto);
  }

  
  findUserInfo(where){
    return this.userRepository.findOne({ where })
  }

  update(id, updateUserDto) {
    return this.userRepository.update(id,updateUserDto);
  }

  remove(whereCon) {
    return this.userRepository.delete(whereCon);
  }
}