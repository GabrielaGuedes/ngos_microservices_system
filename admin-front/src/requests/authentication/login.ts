import { postRequest } from "../../utils/requests";
import { IAuthentication, IUserCredentials } from "./types";

const LOGIN_ROUTE = "/login";

export const login = async (
  data: IUserCredentials
): Promise<IAuthentication> => {
  return await postRequest(
    `${process.env.REACT_APP_AUTHENTICATION_SERVER_API}${LOGIN_ROUTE}`,
    data
  );
};
