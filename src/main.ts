import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { mongoose } from '@typegoose/typegoose';
mongoose.set('strictQuery', false);
async function bootstrap() {
  // 配置跨域
  const corsOptions = { origin: '*' };
  // 配置日志只显示错误信息
  const app = await NestFactory.create(AppModule, {
    cors: corsOptions,
    logger: ['error', 'warn'],
  });
  const options = new DocumentBuilder()
    .setTitle('Cars API')
    .setDescription('The cars API description')
    .setVersion('1.0')
    .addTag('cars')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
  console.log('http://localhost:3000');
}
bootstrap();
