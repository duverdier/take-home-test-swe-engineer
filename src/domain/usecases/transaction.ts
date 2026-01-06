import { TransactionType } from '../interfaces/transaction-type';

export class Transaction {
	public readonly date: string;
	public readonly type: TransactionType;
	public readonly amount: number;
	public readonly balanceAfter: number;

	constructor(params: {
		date: string;
		type: TransactionType;
		amount: number;
		balanceAfter: number;
	}) {
		this.date = params.date;
		this.type = params.type;
		this.amount = params.amount;
		this.balanceAfter = params.balanceAfter;
	}
}
