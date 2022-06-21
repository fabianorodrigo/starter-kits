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
import { ProductDTO } from './DTO/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get(':id')
  async getById(@Param('id') id): Promise<ProductDTO> {
    return this.productService.getById(id);
  }

  @Get()
  async get(@Query('filter') filter): Promise<ReadonlyArray<ProductDTO>> {
    return this.productService.get(filter);
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
