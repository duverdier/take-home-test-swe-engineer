import { InsufficientFundsError } from '../src/domain/exceptions/insufficient-funds-error';
import { InvalidAmountError } from '../src/domain/exceptions/invalid-amount-error';
import { LimitExceededError } from '../src/domain/exceptions/limit-exceeded-error';
import { Clock } from '../src/domain/interfaces/clock';
import { BankAccountImpl } from '../src/domain/repositories/bank-account-impl';
import { StatementPrinter } from '../src/presentation/statement-printer';

function clock(date: string): Clock {
	return { now: () => new Date(date) };
}

function printer(): StatementPrinter {
	return { print: () => {} } as StatementPrinter;
}

describe('withdraw', () => {
	it('valid withdraw updates balance', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		account.deposit(1000);
		account.withdraw(400);
		expect(account.getBalance()).toBe(600);
	});

	it('withdraw zero throws InvalidAmountError', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		account.deposit(1000);
		expect(() => account.withdraw(0)).toThrow(InvalidAmountError);
	});

	it('withdraw negative throws InvalidAmountError', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		account.deposit(1000);
		expect(() => account.withdraw(-10)).toThrow(InvalidAmountError);
	});

	it('withdraw greater than balance throws InsufficientFundsError', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		account.deposit(500);
		expect(() => account.withdraw(600)).toThrow(InsufficientFundsError);
	});

	it('withdraw equal to balance results in zero', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		account.deposit(500);
		account.withdraw(500);
		expect(account.getBalance()).toBe(0);
	});

	it('withdraw above limit throws LimitExceededError', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		account.deposit(1000000);
		expect(() => account.withdraw(1000001)).toThrow(LimitExceededError);
	});
});
