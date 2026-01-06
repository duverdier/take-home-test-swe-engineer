import { BankAccountImpl } from './domain/repositories/bank-account-impl';
import { SystemClock } from './infrastructure/system-clock';
import { StatementPrinter } from './presentation/statement-printer';

const account = new BankAccountImpl(new SystemClock(), new StatementPrinter());

account.deposit(1000);
account.deposit(2000);
account.withdraw(500);
account.printStatement();
