import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductDTO } from './DTO/product.dto';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  async getById(@Param('id') id): Promise<ProductDTO> {
    return this.productService.getById(id);
  }

  @Get()
  async getByCode(@Query('code') code): Promise<ReadonlyArray<ProductDTO>> {
    if (code) {
      return this.productService.getByCode(code);
    } else {
      return this.productService.get();
    }
  }

  @Post()
  async post(@Body() product: ProductDTO) {
    return this.productService.create(product);
  }

  @Put()
  put(@Body() product: ProductDTO) {
    return this.productService.update(product);
  }

  @Delete(':id')
  async del(@Param() params) {
    const { id } = params;
    return this.productService.del(id);
  }
}
