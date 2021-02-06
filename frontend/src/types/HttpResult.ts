export interface HttpResult<T> {
  response?: T;
  error?: HttpError;
}

export interface HttpError {
  statusCode: number;
  message: string;
  error: any;
}
