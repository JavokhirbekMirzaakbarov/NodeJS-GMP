export class AppErrors extends Error {
  statusCode: number;
  methodName: string;
  errorMessage: string;

  constructor(statusCode: number, message: string, methodName?: string) {
    super();
    this.statusCode = statusCode;
    this.methodName = methodName || 'unknown method';
    this.errorMessage = message;
  }
}
