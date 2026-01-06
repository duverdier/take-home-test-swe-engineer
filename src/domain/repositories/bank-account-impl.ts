import { StatementPrinter } from '../../presentation/statement-printer';
import { InsufficientFundsError } from '../exceptions/insufficient-funds-error';
import { InvalidAmountError } from '../exceptions/invalid-amount-error';
import { LimitExceededError } from '../exceptions/limit-exceeded-error';
import { BankAccount } from '../interfaces/bank-account';
import { Clock } from '../interfaces/clock';
import { TransactionType } from '../interfaces/transaction-type';
import { Transaction } from '../usecases/transaction';

const MAX_OPERATION_AMOUNT = 1000000;

export class BankAccountImpl implements BankAccount {
	private balance = 0;
	private readonly transactions: Transaction[] = [];

	constructor(
		private readonly clock: Clock,
		private readonly printer: StatementPrinter
	) {}

	deposit(amount: number): void {
		this.assertValidOperationAmount(amount);

		const newBalance = this.balance + amount;
		this.balance = newBalance;

		this.transactions.push(
			new Transaction({
				date: this.todayIsoDate(),
				type: TransactionType.DEPOSIT,
				amount: amount,
				balanceAfter: newBalance,
			})
		);
	}

	withdraw(amount: number): void {
		this.assertValidOperationAmount(amount);

		if (amount > this.balance) {
			throw new InsufficientFundsError(
				`Insufficient funds: balance ${this.balance}, amount ${amount}.`
			);
		}

		const newBalance = this.balance - amount;
		this.balance = newBalance;

		this.transactions.push(
			new Transaction({
				date: this.todayIsoDate(),
				type: TransactionType.WITHDRAWAL,
				amount: -amount,
				balanceAfter: newBalance,
			})
		);
	}

	printStatement(): void {
		this.printer.print(this.getTransactions());
	}

	public getBalance(): number {
		return this.balance;
	}

	public getTransactions(): readonly Transaction[] {
		return [...this.transactions];
	}

	private assertValidOperationAmount(amount: number): void {
		if (!Number.isInteger(amount)) {
			throw new InvalidAmountError('Amount must be an integer.');
		}
		if (amount <= 0) {
			throw new InvalidAmountError('Amount must be greater than zero.');
		}
		if (amount > MAX_OPERATION_AMOUNT) {
			throw new LimitExceededError(
				`Amount exceeds limit: max ${MAX_OPERATION_AMOUNT}, amount ${amount}.`
			);
		}
	}

	private todayIsoDate(): string {
		return this.clock.now().toISOString().slice(0, 10);
	}
}
