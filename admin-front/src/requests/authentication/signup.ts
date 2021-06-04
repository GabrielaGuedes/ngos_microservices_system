import { postRequest } from "../../utils/requests";
import { IAuthentication, INewUser } from "./types";

const SIGNUP_ROUTE = "/signup";

export const signup = async (data: INewUser): Promise<IAuthentication> => {
  return await postRequest(
    `${process.env.REACT_APP_AUTHENTICATION_SERVER_API}${SIGNUP_ROUTE}`,
    data
  );
};
