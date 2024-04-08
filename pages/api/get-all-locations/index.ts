import { allowedMethods, init, runCORS } from "@/api/middlewares";
import { AppService } from "@/api/services";
import { HttpStatusCode, sendError, sendFail, sendSuccess, validateSchema } from "@/api/utils";


async function requestHandler(
  req: SyntaxNextApiRequest,
  res: SyntaxNextApiResponse<GenericResponse<[]>>
) {
  try {
    const appService = new AppService()
    const places = await appService.getAllPlaces()
    console.log("The bosy====", req.body)
    sendSuccess(res, HttpStatusCode.OK, 'Works', {places});
  } catch (error) {
    console.log("This is the error", error)
    sendSuccess(res, HttpStatusCode.OK, 'Completed')
  }
}

const handler = async (
  req: SyntaxNextApiRequest,
  res: SyntaxNextApiResponse<GenericResponse<[]>>
) => {
  try {
    await runCORS(req, res)
    await requestHandler(req, res);
  } catch (error) {
    sendFail(res, HttpStatusCode.INTERNAL_SERVER_ERROR);
  }
};

export default allowedMethods(["POST"], init(handler));
