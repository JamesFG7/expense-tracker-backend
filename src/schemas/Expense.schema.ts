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

  @Prop({ type: String, ref: 'User', required: true })
  userId: string;
}
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
