import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDTO } from './DTO/product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  get(): Promise<ReadonlyArray<ProductDTO>> {
    return this.productModel.findAll();
  }

  getById(id: number): Promise<ProductDTO> {
    return this.productModel.findByPk(id);
  }

  getByCode(code: string): Promise<Product[]> {
    return this.productModel.findAll({ where: { code: code } });
  }

  create(product: ProductDTO): Promise<ProductDTO> {
    return this.productModel.create(product);
  }

  update(product: ProductDTO) {
    return this.productModel.update(product, {
      where: { id: product.id },
    });
  }

  async del(id: number): Promise<void> {
    const result = await this.productModel.destroy({ where: { id: id } });
    if (result === 0) {
      throw new Error('Product not deleted');
    }
  }
}
