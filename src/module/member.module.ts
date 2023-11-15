import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from '@/src/service/member.service';
import { MemberController } from '@/src/controller/member.controller';
import { Member } from '@/src/entities/member.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule{}
