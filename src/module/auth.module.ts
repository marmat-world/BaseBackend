import { Module } from '@nestjs/common';
import { AuthService } from '@/src/service/auth.service';
import { AuthController } from '@/src/controller/auth.controller';
import { LocalStrategy } from '@/src/common/strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory : async (config: ConfigService) => ({
        secret: config.get('jwt_secret'),	// 设置私钥
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AuthController,LocalStrategy],
  providers: [AuthService]
})
export class AuthModule {}
