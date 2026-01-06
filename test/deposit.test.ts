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

describe('deposit', () => {
	it('valid deposit updates balance', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		account.deposit(1000);
		expect(account.getBalance()).toBe(1000);
	});

	it('deposit zero throws InvalidAmountError', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		expect(() => account.deposit(0)).toThrow(InvalidAmountError);
	});

	it('deposit negative throws InvalidAmountError', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		expect(() => account.deposit(-10)).toThrow(InvalidAmountError);
	});

	it('deposit above limit throws LimitExceededError', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		expect(() => account.deposit(1000001)).toThrow(LimitExceededError);
	});

	it('multiple deposits accumulate correctly', () => {
		const account = new BankAccountImpl(clock('2024-01-10'), printer());
		account.deposit(100);
		account.deposit(200);
		account.deposit(300);
		expect(account.getBalance()).toBe(600);
	});
});
