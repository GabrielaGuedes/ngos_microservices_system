import { postRequest } from "../../utils/requests";
import { AUTHENTICATION_ROUTES } from "./routes";
import { INewUser, INewUserCreated } from "./types";

export const registerUser = async (
  data: INewUser
): Promise<INewUserCreated> => {
  return await postRequest(AUTHENTICATION_ROUTES.registerUser, data);
};
