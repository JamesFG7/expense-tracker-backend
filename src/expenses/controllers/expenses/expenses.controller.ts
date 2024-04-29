import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { Request, Response } from 'express';
import { CreateExpenseDto } from '../../dtos/CreateExpense.dto';
import { Expense } from '../../types/Expense';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}
  @Get(':id')
  getExpense(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
    @Res() res: Response,
  ): void {
    const expense: Expense = this.expensesService.findExpensesById(id);
    if (expense) {
      res.send(expense);
    } else {
      res.status(400).send({ message: 'Expense not found! ' });
    }
  }

  /* @Get(':id')
  searchExpenseById(@Param('id', ParseIntPipe) id: number): Expense {
    const expense = this.expensesService.findExpensesById(id);
    if (expense) return expense;
    else throw new HttpException('Expense not found', HttpStatus.BAD_REQUEST);
  }*/

  @Post('')
  createExpense(@Body() expense: CreateExpenseDto): CreateExpenseDto {
    console.log(expense);
    return this.expensesService.createExpense(expense);
  }

  @Get('')
  getAllExpenses(): Expense[] {
    return this.expensesService.getExpenses();
  }

  @Put('')
  updateExpense(@Body() expense: CreateExpenseDto): CreateExpenseDto {
    return this.expensesService.updateExpense(expense);
  }
}
