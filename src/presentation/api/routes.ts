import { Router } from 'express';
import { amountSchema } from './schemas';
import { BankAccountImpl } from '../../domain/repositories/bank-account-impl';
import { StatementFormatter } from '../statement-formatter';
import { InvalidAmountError } from '../../domain/exceptions/invalid-amount-error';
import { LimitExceededError } from '../../domain/exceptions/limit-exceeded-error';
import { InsufficientFundsError } from '../../domain/exceptions/insufficient-funds-error';
import { z } from 'zod';

export function createRoutes(account: BankAccountImpl): Router {
	const router = Router();

	router.post('/deposit', (req, res) => {
		const parsed = amountSchema.safeParse(req.body);
		if (!parsed.success) {
			return res.status(400).json({
				error: 'INVALID_INPUT',
				details: z.flattenError(parsed.error),
			});
		}

		try {
			account.deposit(parsed.data.amount);
			return res.status(200).json({ balance: account.getBalance() });
		} catch (e) {
			return res.status(400).json(mapError(e));
		}
	});

	router.post('/withdraw', (req, res) => {
		const parsed = amountSchema.safeParse(req.body);
		if (!parsed.success) {
			return res.status(400).json({
				error: 'INVALID_INPUT',
				details: z.flattenError(parsed.error),
			});
		}

		try {
			account.withdraw(parsed.data.amount);
			return res.status(200).json({ balance: account.getBalance() });
		} catch (e) {
			return res.status(400).json(mapError(e));
		}
	});

	router.get('/statement', (_req, res) => {
		const lines = StatementFormatter.toLines(account.getTransactions());
		return res.status(200).json({ lines });
	});

	return router;
}

function mapError(e: any) {
	if (e instanceof InvalidAmountError)
		return { error: 'INVALID_AMOUNT', message: e.message };
	if (e instanceof LimitExceededError)
		return { error: 'LIMIT_EXCEEDED', message: e.message };
	if (e instanceof InsufficientFundsError)
		return { error: 'INSUFFICIENT_FUNDS', message: e.message };

	return { error: 'UNKNOWN_ERROR', message: 'An unexpected error occurred.' };
}
