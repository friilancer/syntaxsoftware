import { dbConnect } from "@/api/db";
import { runCORS } from "./cors";

export const init =
  (
    handler: (
      req: SyntaxNextApiRequest,
      res: SyntaxNextApiResponse<Promise<void>>
    ) => Promise<void | SyntaxNextApiResponse<GenericResponse<[]>>>
  ) =>
  async (
    req: SyntaxNextApiRequest,
    res: SyntaxNextApiResponse<Promise<void>>
  ) => {

    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    
    return handler(req, res);
  };
