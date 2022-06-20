import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductDTO } from './DTO/product.dto';
import { ProductController } from './product.controller';
import { Product } from './product.model';
import { ProductService } from './product.service';

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
    SequelizeModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductDTO],
  exports: [ProductDTO],
})
export class ProductModule {}
