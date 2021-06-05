import { putRequest } from "../../utils/requests";
import { AUTHENTICATION_ROUTES } from "./routes";
import { INewPassword, ISuccess } from "./types";

export const redefinePassword = async (
  data: INewPassword
): Promise<ISuccess> => {
  return await putRequest(
    `${process.env.REACT_APP_AUTHENTICATION_SERVER_API}${AUTHENTICATION_ROUTES.redefinePassword}`,
    data
  );
};
