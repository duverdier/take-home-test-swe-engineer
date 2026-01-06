import { Transaction } from '../domain/usecases/transaction';
import { StatementFormatter } from './statement-formatter';

export class StatementPrinter {
	print(transactions: readonly Transaction[]): void {
		console.log(StatementFormatter.toText(transactions));
	}
}
