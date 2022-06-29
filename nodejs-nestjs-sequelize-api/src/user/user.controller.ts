import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from './DTO/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getByUsername(@Param('username') username): Promise<UserDTO> {
    return this.userService.getByUsername(username);
  }

  @Get()
  async get(): Promise<ReadonlyArray<UserDTO>> {
    return this.userService.get();
  }

  @Post()
  async post(@Body() product: UserDTO) {
    return this.userService.create(product);
  }

  @Put()
  put(@Body() product: UserDTO) {
    return this.userService.update(product);
  }

  @Delete(':username')
  async del(@Param('username') username) {
    return this.userService.del(username);
  }
}
