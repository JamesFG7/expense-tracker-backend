import { CreateExpenseDto } from '../../dtos/CreateExpense.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from 'src/schemas/User.schema';
import { ExpressRequest } from 'src/middlewares/auth.middleware';
import { Expense } from '../../types/Expense';
import { env } from 'process';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  isTransactionTypeValid(transactionType: string): boolean {
    return ['Income', 'Expense'].includes(transactionType);
  }
  async createExpense(
    expense: CreateExpenseDto,
    userId: string,
  ): Promise<CreateExpenseDto> {
    //const createdExpense = new this.ExpenseModel(expense);

    const result: User = await this.UserModel.findByIdAndUpdate(
      userId,
      {
        $push: { expenses: expense },
      },
      { new: true },
    );
    return result.expenses[Object.keys(result.expenses).length - 1];
  }
  async findExpensesById(id: string, userId: string): Promise<Expense> {
    try {
      const user: User = await this.UserModel.findOne(
        { _id: userId, 'expenses._id': id },
        { 'expenses.$': 1 },
      ).exec();

      console.log(user.expenses);
      return user.expenses[0];
    } catch (e) {
      throw new Error('Expense not found');
    }
  }

  async getExpenses(userId: string): Promise<any> {
    const user: User = await this.UserModel.findById(userId).exec();
    return user.expenses;
  }
  async updateExpense(
    id: string,
    expense: CreateExpenseDto,
    userId: string,
  ): Promise<any> {
    console.log('id', id);
    console.log(userId);
    console.log('expense', expense);
    return '';
  }

  /* async deleteExpense(id: string, userId: string): Promise<Expense> {
    return this.ExpenseModel.findByIdAndDelete(id);
  } */
}
