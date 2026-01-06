export class InvalidAmountError extends Error {
	constructor(message = 'Amount must be greater than zero.') {
		super(message);
		this.name = 'InvalidAmountError';
	}
}
