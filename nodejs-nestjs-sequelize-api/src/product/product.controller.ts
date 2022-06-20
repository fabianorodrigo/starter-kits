import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  async getById(@Param('id') id): Promise<Product> {
    return this.productService.getById(id);
  }

  @Get()
  async getByCode(@Query('code') code): Promise<ReadonlyArray<Product>> {
    if (code) {
      return this.productService.getByCode(code);
    } else {
      return this.productService.get();
    }
  }

  @Post()
  async post(@Body() product: Product) {
    return this.productService.create(product);
  }

  @Put()
  put(@Body() product: Product) {
    return this.productService.update(product);
  }

  @Delete(':id')
  async del(@Param() params) {
    const { id } = params;
    return this.productService.del(id);
  }
}
