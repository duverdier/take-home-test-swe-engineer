export class LimitExceededError extends Error {
	constructor(message = 'Amount exceeds the maximum allowed per operation.') {
		super(message);
		this.name = 'LimitExceededError';
	}
}
