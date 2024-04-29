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
} from '@nestjs/common';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { CreateExpenseDto } from '../../dtos/CreateExpense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}
  @Get(':id')
  async getExpense(@Param('id') id: string) {
    const expense = await this.expensesService.findExpensesById(id);
    if (expense) expense;
    else throw new HttpException('Expense not found!', 400);
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  createExpense(@Body() expense: CreateExpenseDto) {
    return this.expensesService.createExpense(expense);
  }

  @Get('')
  getAllExpenses() {
    return this.expensesService.getExpenses();
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateExpense(@Param('id') id: string, @Body() expense: CreateExpenseDto) {
    return this.expensesService.updateExpense(id, expense);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  async deleteExpense(@Param('id') id: string) {
    const expense = await this.expensesService.deleteExpense(id);
    if (expense) expense;
    else throw new HttpException('Expense not found!', 400);
  }
}
