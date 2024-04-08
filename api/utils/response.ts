import HttpStatusCode from "./http-codes";

export function sendSuccess(
  res: SyntaxNextApiResponse<GenericResponse<[]>>,
  statusCode: HttpStatusCode,
  message: string,
  data: Record<string, any> = []
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data,
  });
}

export function sendError(
  res: SyntaxNextApiResponse<GenericResponse<[]>>,
  statusCode: HttpStatusCode,
  error?: Error | string | any
) {
  const err = error ? error : new Error("An error occured");
  console.log(err);
  return res.status(statusCode).json({
    success: false,
    data: [],
    error: err?.message,
  })
}

export function sendFail(
  res: SyntaxNextApiResponse<GenericResponse<[]>>,
  statusCode: HttpStatusCode,
  error?: Error | string | any
) {
  const err = error ? error : new Error("Internal Server error");
  console.log(err);
  return res.status(statusCode).json({
    success: false,
    data: [],
    error: err?.message,
  });
}
