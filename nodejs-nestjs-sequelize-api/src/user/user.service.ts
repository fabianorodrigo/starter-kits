import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDTO } from './DTO/user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  get(): Promise<ReadonlyArray<UserDTO>> {
    return this.userModel.findAll();
  }

  getByUsername(username: string): Promise<UserDTO> {
    return this.userModel.findByPk(username);
  }

  create(User: UserDTO): Promise<UserDTO> {
    return this.userModel.create(User);
  }

  update(User: UserDTO) {
    return this.userModel.update(User, {
      where: { username: User.username },
    });
  }

  async del(username: string): Promise<void> {
    const result = await this.userModel.destroy({
      where: { username: username },
    });
    if (result === 0) {
      throw new Error('User not deleted');
    }
  }
}
