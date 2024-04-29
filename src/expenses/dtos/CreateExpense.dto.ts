import { Transform } from 'class-transformer';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  date: Date;

  @IsNotEmpty()
  @IsInt()
  amount: number;

  @IsNotEmpty()
  @IsString()
  transaction_type: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
