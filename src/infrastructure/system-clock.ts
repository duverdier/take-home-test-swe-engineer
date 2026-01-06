import { Clock } from '../domain/interfaces/clock';

export class SystemClock implements Clock {
	now(): Date {
		return new Date();
	}
}
