import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateExpenseDto {
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  date?: Date;

  @IsOptional()
  @IsInt()
  amount?: number;

  @IsOptional()
  @IsString()
  transaction_type?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
