import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from 'src/model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  get(): Promise<ReadonlyArray<Product>> {
    return this.productModel.findAll();
  }

  getById(id: number): Promise<Product> {
    return this.productModel.findByPk(id);
  }

  create(product: Product) {
    this.productModel.create(product);
  }

  update(product: Product) {
    this.productModel.update(product, {
      where: { id: product.id },
    });
  }

  async del(id: number): Promise<void> {
    const result = await this.productModel.destroy({ where: { id: id } });
  }
}
