export interface ErrorResponse {
  error: string;
  status: string;
  http_code: number;
}

export function badRequest(error: string, status: string): ErrorResponse {
  return {
    error,
    status,
    http_code: 400
  };
}
export function notFound(error: string, status: string): ErrorResponse {
  return {
    error,
    status,
    http_code: 404
  };
}

export function Forbidden(error: string, status: string): ErrorResponse {
  return {
    error,
    status,
    http_code: 403
  };
}
export function UnAuthorized(error: string, status: string): ErrorResponse {
  return {
    error,
    status,
    http_code: 401
  };
}
