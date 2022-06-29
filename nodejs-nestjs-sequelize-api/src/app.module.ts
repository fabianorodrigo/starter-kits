import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_DB_HOSTNAME,
      port: parseInt(process.env.POSTGRES_DB_PORT || '5432'),
      username: process.env.POSTGRES_DB_USERNAME,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: process.env.POSTGRES_DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // ativa o interceptador disponibilizado pelo NestJS que trata da serialização dos dados
    // com isso, as anotações do class-transformer feitas nos DTOs passam a fazer efeito
    // NÃO ROLOU
    //{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
