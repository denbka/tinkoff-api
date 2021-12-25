import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './common/pipes/validation.pipe';

const start = async () => {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000/',
      allowedHeaders: 'http://localhost:3000/',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });
  app.setGlobalPrefix('api');
  // app.useGlobalPipes(new ValidationPipe())

  const port = process.env.APP_PORT || 5000;

  const config = new DocumentBuilder()
    .setTitle('Тестовая дока')
    .setDescription('213')
    .setVersion('1.0.0')
    .addTag('tes tag')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  // app.useGlobalPipes(new ValidationPipe())
  await app.listen(port, () => console.log(`Server starting on ${port} port`));
};

start();
