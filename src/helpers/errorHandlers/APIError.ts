import httpStatus from "http-status";
import BaseError from "./BaseError";

export interface IAPIError {
  name: string;
  message: string;
  status: number;
  isPublic: boolean;
  isOperational: boolean;
  stack: any;
}

/**
 * Class representing an API error.
 * @extends BaseError
 */
export default class APIError extends BaseError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message: string, status: number = httpStatus.INTERNAL_SERVER_ERROR, isPublic: boolean = false) {
    super(message, status, isPublic);
  }
}