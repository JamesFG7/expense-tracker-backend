import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { UpdateExpenseDto } from '../../dtos/UpdateExpense.dto';
import { Expense } from '../../../schemas/Expense.schema';
import mongoose from 'mongoose';
import { CreateExpenseDto } from '../../dtos/CreateExpense.dto';
import { ExpressRequest } from '../../../middlewares/auth.middleware';
import { PaginatedExpense } from '../../types/PaginatedExpense';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Get('' + '/dashboard')
  async dashboard(@Req() request: ExpressRequest): Promise<any> {
    return this.expensesService.dashboard(request.user._id);
  }
  @Get(':id')
  async getExpense(
    @Param('id') id: string,
    @Req() request: ExpressRequest,
  ): Promise<Expense> {
    const expense: Expense = await this.expensesService.findExpensesById(
      id,
      request.user._id,
    );
    const isValidObjectId: boolean = mongoose.Types.ObjectId.isValid(id);
    if (expense && isValidObjectId) return expense;
    throw new HttpException('Expense not found!', 400);
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  async createExpense(
    @Body() expense: CreateExpenseDto,
    @Req() request: ExpressRequest,
  ): Promise<Expense> {
    return await this.expensesService.createExpense(expense, request.user._id);
  }

  @Get('')
  async getAllExpenses(
    @Query('page') page: number,
    @Req() request: ExpressRequest,
  ): Promise<PaginatedExpense> {
    console.log(page);
    return this.expensesService.getExpenses(request.user._id, page);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  updateExpense(
    @Param('id') id: string,
    @Req() request: ExpressRequest,
    @Body() expense: UpdateExpenseDto,
  ): Promise<Expense> {
    const isValidObjectId: boolean = mongoose.Types.ObjectId.isValid(id);
    if (!isValidObjectId) throw new HttpException('Invalid ID!', 400);
    return this.expensesService.updateExpense(id, request.user._id, expense);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteExpense(
    @Param('id') id: string,
    @Req() request: ExpressRequest,
  ): Promise<Expense> {
    const expense: Expense = await this.expensesService.deleteExpense(
      id,
      request.user._id,
    );
    const isValidObjectId: boolean = mongoose.Types.ObjectId.isValid(id);
    if (expense && isValidObjectId) return expense;
    else throw new HttpException('Expense not found!', 400);
  }
}
