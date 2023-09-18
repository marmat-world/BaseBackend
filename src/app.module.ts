import { join } from 'path'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevtoolsModule } from "@nestjs/devtools-integration"
import { TransformInterceptor } from './common/interceptor/transform.interceptor'
import { GlobalModule } from './customprovide/modules';
import { APP_INTERCEPTOR } from '@nestjs/core';
import ModuleData from "@/src/module"
import { ConfigService, ConfigModule } from '@nestjs/config';
import configuration from '@/src/common/config/configuration';
const entitiesPaths = [join(__dirname, '.', '**', '*.entity.{ts,js}')]

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('database.host'), 
        port: 3306,
        username: config.get('database.user'),
        password: config.get('database.password'),
        database: config.get('database.db_name'),
        //dropSchema:true,
        synchronize:true,      
        // logging:["query", "error", "schema"],
        entities: entitiesPaths 
      }),
      inject: [ConfigService]
    }),
    DevtoolsModule.register({
      port:8001,
      http: process.env.NODE_ENV !== 'production',
    }),
    GlobalModule,
    ...ModuleData
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_INTERCEPTOR,
    useClass:TransformInterceptor
  }],
})
export class AppModule {}
