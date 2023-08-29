import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResultVO } from "./VO/ResultVO";
import { ValidationPipe } from "./pipe/projects.pipe"
//import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false, // <--- THIS
  });
  app.enableCors();
  //app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
        .setTitle('phantom')
        .setDescription('The phantom API description')
        .setVersion('1.0')
        .addTag('phantom')
        .build();
      const document = SwaggerModule.createDocument(app, config,{
        extraModels: [ResultVO]
      });
      SwaggerModule.setup('api', app, document);
      
      app.useGlobalPipes(new ValidationPipe());
      app.useGlobalFilters(new HttpExceptionFilter());
      await app.listen(3000);
}
bootstrap().catch((err) => {
  console.log(err)
  // fs.writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
  process.exit(1);
});;
