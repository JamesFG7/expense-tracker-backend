import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expense } from './Expense.schema';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [Expense], default: [] })
  expenses: Expense[];
}
export const UserSchema = SchemaFactory.createForClass(User);
