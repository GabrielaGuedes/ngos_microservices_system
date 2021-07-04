import { postRequest } from "../../utils/requests";
import { AUTHENTICATION_ROUTES } from "./routes";
import { IAuthentication, INewUser } from "./types";

export const signup = async (data: INewUser): Promise<IAuthentication> => {
  return await postRequest(AUTHENTICATION_ROUTES.signup, data);
};
