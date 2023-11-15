import { Module } from '@nestjs/common';
import { AuthService } from '@/src/service/auth.service';
import { AuthController } from '@/src/controller/auth.controller';
import { AdminStrategy } from '@/src/common/strategy/admin.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';
import { MemberModule } from './member.module';

@Module({
  imports: [
    UserModule,
    MemberModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory : async (config: ConfigService) => ({
        secret: config.get('jwt_secret'),	// 设置私钥
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AuthController,AdminStrategy],
  providers: [AuthService]
})
export class AuthModule {}
