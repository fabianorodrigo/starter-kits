import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
} from 'sequelize-typescript';
import { UserDTO } from './DTO/user.dto';

@Table({ tableName: 'tb_user' })
export class User extends Model<UserDTO> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(64),
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 64],
    },
  })
  username: string;

  @Column({
    type: DataType.STRING(64),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [7, 64],
    },
  })
  password: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  fullname: string;
}
