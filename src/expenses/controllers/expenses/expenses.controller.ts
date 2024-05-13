import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { CreateExpenseDto } from '../../dtos/CreateExpense.dto';
import { ExpressRequest } from 'src/middlewares/auth.middleware';
import { Expense } from 'src/expenses/types/Expense';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  createExpense(
    @Body() expense: CreateExpenseDto,
    @Req() request: ExpressRequest,
  ) {
    return this.expensesService.createExpense(expense, request.user._id);
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
    if (expense) return expense;
    else throw new HttpException('Expense not found!', 400);
  }

  @Get('')
  getAllExpenses(@Req() request: ExpressRequest) {
    return this.expensesService.getExpenses(request.user._id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateExpense(
    @Param('id') id: string,
    @Body() expense: CreateExpenseDto,
    @Req() request: ExpressRequest,
  ) {
    return this.expensesService.updateExpense(id, expense, request.user._id);
  }

  /* @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteExpense(@Param('id') id: string) {
    const expense = await this.expensesService.deleteExpense(
      id,
      request.user._id,
    );
    if (expense) expense;
    else throw new HttpException('Expense not found!', 400);
  } */
}
