import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Expense {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  transaction_type: string;
}
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
