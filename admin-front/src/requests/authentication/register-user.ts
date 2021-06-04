import { postRequest } from "../../utils/requests";
import { INewUser, INewUserCreated } from "./types";

const REGISTER_USER_ROUTE = "/register-user";

export const registerUser = async (
  data: INewUser
): Promise<INewUserCreated> => {
  return await postRequest(
    `${process.env.REACT_APP_AUTHENTICATION_SERVER_API}${REGISTER_USER_ROUTE}`,
    data
  );
};
