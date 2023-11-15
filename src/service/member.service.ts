import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '@/src/entities/member.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as _ from 'lodash';
import { CreateLoginDto } from "@/src/dto/create-login.dto";
import { ApiException } from '@/src/common/http-exception/api-exception';
import { ApiErrorCode } from '@/src/common/api-error-code.enum';
@Injectable()
export class MemberService {

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>
  ){
  }

  async validateUser(loginUserDto: CreateLoginDto) {
    const username = loginUserDto.username;
    const password = loginUserDto.password;

    if (_.isEmpty(username) || _.isEmpty(password)) {
      throw new ApiException('用户名或密码不能为空',ApiErrorCode.PARAM_ERROR);
    }
    // 默认为Entity的命名
    const user = await this.memberRepository.createQueryBuilder().where({ username }).addSelect('Member.password').getOne();
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
    const entityDto = this.memberRepository.create(createUserDto)
    return this.memberRepository.save(entityDto);
  }

  
  findUserInfo(where){
    return this.memberRepository.findOne({ where })
  }

  update(id, updateUserDto) {
    return this.memberRepository.update(id,updateUserDto);
  }

  remove(whereCon) {
    return this.memberRepository.delete(whereCon);
  }
}