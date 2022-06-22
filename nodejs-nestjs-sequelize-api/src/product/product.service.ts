import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { ProductDTO } from './DTO/product.dto';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  get(filter: string): Promise<ReadonlyArray<ProductDTO>> {
    const where =
      !filter || filter.trim() == ''
        ? {}
        : {
            where: {
              [Op.or]: [
                { name: { [Op.iLike]: `%${filter}%` } },
                { code: { [Op.iLike]: `%${filter}%` } },
              ],
            },
          };
    return this.productModel.findAll(where);
  }

  getById(id: number): Promise<ProductDTO> {
    return this.productModel.findByPk(id);
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
