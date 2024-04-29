import { ExpensesModule } from './expenses/expenses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from './users/.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/expense_tracker'),
    ExpensesModule,
    Module,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
