import { putRequest } from "../../utils/requests";
import { INewPassword, ISuccess } from "./types";

const REDEFINE_PASSWORD_ROUTE = "/redefine-password";

export const redefinePassword = async (
  data: INewPassword
): Promise<ISuccess> => {
  return await putRequest(
    `${process.env.REACT_APP_AUTHENTICATION_SERVER_API}${REDEFINE_PASSWORD_ROUTE}`,
    data
  );
};
