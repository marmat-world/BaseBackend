import { join } from 'path'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevtoolsModule } from "@nestjs/devtools-integration"
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core';
import ModuleData from "@/src/module"

const entitiesPaths = [join(__dirname, '.', '**', '*.entity.{ts,js}')]

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '****',
      port: 3306,
      username: '****',
      password: '***',
      database: '***',
      //dropSchema:true,
      synchronize:true,      
      // logging:["query", "error", "schema"],
      entities: entitiesPaths 
    }),
    DevtoolsModule.register({
      port:8001,
      http: process.env.NODE_ENV !== 'production',
    }),
    ...ModuleData
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide:APP_INTERCEPTOR,
    useClass:TransformInterceptor
  }],
})
export class AppModule {}
