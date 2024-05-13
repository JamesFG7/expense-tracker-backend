import { Expense } from '../../schemas/Expense.schema';

export interface PaginatedExpense {
  data: Expense[];
  totalPage: number;
  currentPage: number;
  perPage: number;
}
