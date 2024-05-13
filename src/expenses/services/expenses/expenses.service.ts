import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from '../../dtos/CreateExpense.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from 'src/schemas/Expense.schema';
import { UpdateExpenseDto } from '../../dtos/UpdateExpense.dto';
import { PaginatedExpense } from '../../types/PaginatedExpense';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private ExpenseModel: Model<Expense>,
  ) {}

  isTransactionTypeValid(transactionType: string): boolean {
    return ['Income', 'Expense'].includes(transactionType);
  }
  async createExpense(
    expense: CreateExpenseDto,
    userId: string,
  ): Promise<Expense> {
    const createdExpense = new this.ExpenseModel(expense);
    createdExpense.userId = userId;
    return createdExpense.save();
  }
  async findExpensesById(id: string, userId: string): Promise<Expense> {
    return await this.ExpenseModel.findOne({
      _id: id,
      userId: userId,
    }).exec();
  }

  async getExpenses(
    userId: string,
    page: number = 1,
    perPage: number = 25,
  ): Promise<PaginatedExpense> {
    const expenses: Expense[] = await this.ExpenseModel.find({ userId: userId })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    const totalPages: number = Math.ceil(
      (await this.ExpenseModel.countDocuments({ userId: userId }).exec()) /
        perPage,
    );
    return {
      data: expenses,
      totalPage: totalPages,
      currentPage: page,
      perPage: perPage,
    };
  }

  async updateExpense(
    id: string,
    userId: string,
    expense: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.ExpenseModel.findOneAndUpdate(
      {
        _id: id,
        userId: userId,
      },
      expense,
      {
        new: true,
      },
    );
  }

  async deleteExpense(id: string, userId: string): Promise<Expense> {
    return this.ExpenseModel.findOneAndDelete({
      _id: id,
      userId: userId,
    });
  }
}
