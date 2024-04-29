import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from '../../dtos/CreateExpense.dto';
import { Expense } from '../../types/Expense';

@Injectable()
export class ExpensesService {
  private expenses: Expense[] = [
    {
      id: 1,
      date: new Date(),
      amount: 100,
      transaction_type: 'income',
      category: 'salary',
    },
    {
      id: 2,
      date: new Date(),
      amount: 300,
      transaction_type: 'expense',
      category: 'food',
    },
  ];
  findExpensesById(id: number): Expense {
    return this.expenses.find((expense: Expense): boolean => expense.id === id);
  }
  createExpense(expense: CreateExpenseDto): CreateExpenseDto {
    this.expenses.push(<Expense>expense);
    return expense;
  }
  getExpenses(): Expense[] {
    return this.expenses;
  }

  updateExpense(expense: CreateExpenseDto): CreateExpenseDto {
    return expense;
  }
}
