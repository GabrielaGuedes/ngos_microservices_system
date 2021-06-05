import { postRequest } from "../../utils/requests";
import { AUTHENTICATION_ROUTES } from "./routes";
import { IAuthentication, IUserCredentials } from "./types";

export const login = async (
  data: IUserCredentials
): Promise<IAuthentication> => {
  return await postRequest(
    `${process.env.REACT_APP_AUTHENTICATION_SERVER_API}${AUTHENTICATION_ROUTES.login}`,
    data
  );
};
