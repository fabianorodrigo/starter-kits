import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ProductDTO } from './DTO/product.dto';

@Table
export class Product extends Model<ProductDTO> {
  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [3, 100],
    },
  })
  name: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;
}
