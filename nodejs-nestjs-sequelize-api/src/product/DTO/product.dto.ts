import { IsNotEmpty, Min, Length, IsString } from 'class-validator';

export class ProductDTO {
  id?: number;
  @IsNotEmpty()
  code: string;
  @IsNotEmpty()
  @Length(3, 100)
  @IsString()
  name: string;
  @Min(0.01)
  price: number;
}
