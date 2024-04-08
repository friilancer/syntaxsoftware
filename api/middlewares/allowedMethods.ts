import { HttpStatusCode, sendError } from "../utils";

export const allowedMethods =
  (
    methods: string[],
    handler: (
      req: SyntaxNextApiRequest,
      res: SyntaxNextApiResponse<Promise<void>>
    ) => Promise<void | SyntaxNextApiResponse<GenericResponse<[]>>>
  ) =>
  async (
    req: SyntaxNextApiRequest,
    res: SyntaxNextApiResponse<Promise<void>>
  ) => {

    if (!methods.includes(req.method as string)) {
      return sendError(
        res,
        HttpStatusCode.METHOD_NOT_ALLOWED,
        new Error("Method not handled by the server")
      );
    }

    return handler(req, res);
  };
