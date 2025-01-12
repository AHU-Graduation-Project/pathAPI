export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Pass the message to the base Error class
    this.name = this.constructor.name; // Set the error name to the class name
    this.statusCode = statusCode; // Add a statusCode property
    Error.captureStackTrace(this, this.constructor); // Capture stack trace
  }
}
