import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from 'src/model';
import { ProductService } from 'src/services';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async get(): Promise<ReadonlyArray<Product>> {
    return this.productService.get();
  }

  @Get(':id')
  async getById(@Param() params): Promise<Product> {
    const { id } = params;
    return this.productService.getById(id);
  }

  @Post()
  async post(@Body() product) {
    return this.productService.create(product);
  }

  @Put()
  put(@Body() product) {
    return this.productService.update(product);
  }

  @Delete(':id')
  async del(@Param() params) {
    const { id } = params;
    return this.productService.del(id);
  }
}
