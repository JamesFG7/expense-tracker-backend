import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expense } from './Expense.schema';
import { hash } from 'bcrypt';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ type: [Expense], default: [] })
  expenses: Expense[];
  _id: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next: any): Promise<void> {
  this.password = await hash(this.password, 10);
  next();
});
