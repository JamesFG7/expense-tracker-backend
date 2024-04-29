import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from '../../dtos/CreateExpense.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Expense } from 'src/schemas/Expense.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private ExpenseModel: Model<Expense>,
  ) {}

  isTransactionTypeValid(transactionType: string): boolean {
    return ['Income', 'Expense'].includes(transactionType);
  }
  async createExpense(expense: CreateExpenseDto): Promise<Expense> {
    const createdExpense = new this.ExpenseModel(expense);
    return createdExpense.save();
  }
  async findExpensesById(id: string): Promise<Expense> {
    return this.ExpenseModel.findById(id).exec();
  }

  async getExpenses(): Promise<Expense[]> {
    return this.ExpenseModel.find().exec();
  }

  async updateExpense(id: string, expense: CreateExpenseDto): Promise<Expense> {
    return this.ExpenseModel.findByIdAndUpdate(id, expense, {
      new: true,
    });
  }

  async deleteExpense(id: string): Promise<Expense> {
    return this.ExpenseModel.findByIdAndDelete(id);
  }
}
