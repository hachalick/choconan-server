import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './Api/Modules/App.Module.js';
import {
  ApplicationConfigurationKeys,
  ApplicationConfigurationValues,
} from './Persistence/Configuration/Parameter/Application.Configuration.js';
import { CallBackListener } from './Share/Utils/CallBack.main.js';
import { ConfigurationSwagger } from './Persistence/Configuration/swaagger.js';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: '*' });
  app.useStaticAssets(join(process.cwd(), 'public'));
  const configService = app.get(ConfigService);
  const port =
    configService.get<number>(
      `${ApplicationConfigurationKeys.APPLICATION}.${ApplicationConfigurationValues.PORT_SERVER}`,
    ) || 3000;
  const document = SwaggerModule.createDocument(app, ConfigurationSwagger);
  SwaggerModule.setup('api/swagger', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => CallBackListener(port));
}

bootstrap();
