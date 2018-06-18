
export function responseSuccess(data: any = [], opts: object = {}) {
  return {
    data: data,
    success: 1
  };
}

interface ErrorType {
  status: number;
  message: string;
  stack?: object;
}

export function responseError(error: ErrorType, opts = {}) {
  return {
    status: error.status,
    message: error.message,
    success: 0,
    stack: process.env.NODE_ENV === "development" ? error.stack : {}
  };
}