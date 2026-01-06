import { Clock } from '../src/domain/interfaces/clock';
import { BankAccountImpl } from '../src/domain/repositories/bank-account-impl';
import { StatementFormatter } from '../src/presentation/statement-formatter';
import { StatementPrinter } from '../src/presentation/statement-printer';

function clock(dates: string[]): Clock {
	let i = 0;
	return {
		now: () => new Date(dates[Math.min(i++, dates.length - 1)]),
	};
}

function printer(): StatementPrinter {
	return { print: () => {} } as StatementPrinter;
}

describe('printStatement / statement formatting', () => {
	it('empty account returns empty lines', () => {
		const account = new BankAccountImpl(clock(['2024-01-10']), printer());
		const lines = StatementFormatter.toLines(account.getTransactions());
		expect(lines).toEqual([]);
	});

	it('single transaction is formatted correctly', () => {
		const account = new BankAccountImpl(clock(['2024-01-10']), printer());
		account.deposit(1000);

		const lines = StatementFormatter.toLines(account.getTransactions());
		expect(lines).toHaveLength(1);
		expect(lines[0]).toEqual({
			date: '2024-01-10',
			type: 'DEPOSIT',
			amount: 1000,
			balance: 1000,
		});
	});

	it('multiple transactions are ordered by date desc', () => {
		const account = new BankAccountImpl(
			clock(['2024-01-10', '2024-01-14', '2024-01-15']),
			printer()
		);

		account.deposit(1000);
		account.deposit(2000);
		account.withdraw(500);

		const lines = StatementFormatter.toLines(account.getTransactions());
		expect(lines.map((l) => l.date)).toEqual([
			'2024-01-15',
			'2024-01-14',
			'2024-01-10',
		]);
	});

	it('balances after each operation are consistent', () => {
		const account = new BankAccountImpl(
			clock(['2024-01-10', '2024-01-14', '2024-01-15']),
			printer()
		);

		account.deposit(1000);
		account.deposit(2000);
		account.withdraw(500);

		const tx = account.getTransactions();
		expect(tx[0].balanceAfter).toBe(1000);
		expect(tx[1].balanceAfter).toBe(3000);
		expect(tx[2].balanceAfter).toBe(2500);
	});
});
