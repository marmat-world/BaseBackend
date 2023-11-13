import { Entity, Column, BeforeInsert} from 'typeorm';
import { Base } from '@/src/entities/base.entity'
import * as bcrypt from 'bcryptjs'
@Entity()
export class User extends Base{

  @Column({ type: 'varchar', length: 20, default: '', comment: '用户名'})
  username: string

  @Column({ type: 'varchar', length: 80, default: '', comment: '密码', select: false})
  password: string

  @Column({ type: 'varchar', length: 200, default: '', comment: '头像',})
  avatar: string

  @Column({ type: 'varchar', length: 13, default: '', comment: '手机号码',})
  mobile: string

  @BeforeInsert()
  async hashPassword(){
    this.password = await bcrypt.hash(this.password,10);
  }

  @Column({ type: 'bigint', default: 0, comment: '上次登录时间'})
  last_login: number 

  @Column({ type: 'varchar', length: 15, default: '', comment: 'IP地址'})
  ip_address: string
  
}