import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpensesController } from './controllers/expenses/expenses.controller';
import { ExpensesService } from './services/expenses/expenses.service';
import { Expense, ExpenseSchema } from '../schemas/Expense.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Expense.name, schema: ExpenseSchema }]),
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
