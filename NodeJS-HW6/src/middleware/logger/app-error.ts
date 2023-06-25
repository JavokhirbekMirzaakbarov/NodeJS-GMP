export class AppError extends Error {
  statusCode: number;
  methodName: string;
  errorMessage: string;
  args: object;

  constructor(
    statusCode: number,
    message: string,
    methodName?: string,
    args?: object,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.methodName = methodName || 'unknown method';
    this.errorMessage = message;
    this.args = args || {};
  }
}
