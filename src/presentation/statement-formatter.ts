import { Transaction } from '../domain/usecases/transaction';

export type StatementLine = {
	date: string;
	type: string;
	amount: number;
	balance: number;
};

export class StatementFormatter {
	static toLines(transactions: readonly Transaction[]): StatementLine[] {
		return [...transactions]
			.sort((a, b) => b.date.localeCompare(a.date))
			.map((t) => ({
				date: t.date,
				type: t.type,
				amount: t.amount,
				balance: t.balanceAfter,
			}));
	}

	static toText(transactions: readonly Transaction[]): string {
		const lines = this.toLines(transactions);

		if (lines.length === 0) {
			return 'No transactions.';
		}

		const header = 'Date       | Type       | Amount  | Balance';
		const sep = '-----------+------------+---------+--------';

		const rows = lines.map((l) => {
			const date = l.date.padEnd(10, ' ');
			const type = l.type.padEnd(10, ' ');
			const amount = String(l.amount).padStart(7, ' ');
			const balance = String(l.balance).padStart(7, ' ');
			return `${date} | ${type} | ${amount} | ${balance}`;
		});

		return [header, sep, ...rows].join('\n');
	}
}
