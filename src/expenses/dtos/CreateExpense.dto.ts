import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  amount: number;

  @IsString()
  transaction_type: string;

  @IsString()
  category: string;
}
