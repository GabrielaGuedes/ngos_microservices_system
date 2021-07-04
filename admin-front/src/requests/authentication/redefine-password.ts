import { putRequest } from "../../utils/requests";
import { AUTHENTICATION_ROUTES } from "./routes";
import { INewPassword, ISuccess } from "./types";

export const redefinePassword = async (
  data: INewPassword
): Promise<ISuccess> => {
  return await putRequest(AUTHENTICATION_ROUTES.redefinePassword, data);
};
