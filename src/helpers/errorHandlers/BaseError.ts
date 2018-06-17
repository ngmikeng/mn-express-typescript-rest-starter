/**
 * @extends Error
 */
export default class BaseError extends Error {
  status: number;
  isPublic: boolean;
  isOperational: boolean;

  constructor(message: string, status: number, isPublic: boolean) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}