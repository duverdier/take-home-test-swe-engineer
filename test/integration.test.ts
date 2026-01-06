import { Clock } from '../src/domain/interfaces/clock';
import { BankAccountImpl } from '../src/domain/repositories/bank-account-impl';
import { StatementFormatter } from '../src/presentation/statement-formatter';
import { StatementPrinter } from '../src/presentation/statement-printer';

function clock(dates: string[]): Clock {
	let i = 0;
	return { now: () => new Date(dates[Math.min(i++, dates.length - 1)]) };
}

function printer(): StatementPrinter {
	return { print: () => {} } as StatementPrinter;
}

describe('integration scenario', () => {
	it('deposit → withdraw → deposit → statement', () => {
		const account = new BankAccountImpl(
			clock(['2024-01-10', '2024-01-14', '2024-01-15']),
			printer()
		);

		account.deposit(1000);
		account.withdraw(300);
		account.deposit(200);

		expect(account.getBalance()).toBe(900);

		const lines = StatementFormatter.toLines(account.getTransactions());
		expect(lines).toEqual([
			{ date: '2024-01-15', type: 'DEPOSIT', amount: 200, balance: 900 },
			{ date: '2024-01-14', type: 'WITHDRAWAL', amount: -300, balance: 700 },
			{ date: '2024-01-10', type: 'DEPOSIT', amount: 1000, balance: 1000 },
		]);
	});
});
