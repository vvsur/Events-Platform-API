import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('GonnaVisit API')
    .setDescription('Operations with events collections')
    .setVersion('1.0')
    .addTag('Autentification', 'description...')
    .addTag('Users & Organizers', 'description...')
    .addTag('Events', 'description...')
    .addTag('Transactions', 'description...')
    .addTag('Content', 'description...')
    .addBearerAuth(
      // { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      // 'access-token'
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'GonnaVisit.com API Documentation',
    customfavIcon: '/static/favicon.jpg',
  });
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
