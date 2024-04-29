import { ExpensesModule } from './expenses/expenses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/expense_tracker'),
    ExpensesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
