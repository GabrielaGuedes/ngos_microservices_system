import { getRequest } from "../../utils/requests";
import { AUTHENTICATION_ROUTES } from "./routes";
import { ISelfRegister } from "./types";

export const canSelfRegister = async (): Promise<ISelfRegister> => {
  return await getRequest(
    `${process.env.REACT_APP_AUTHENTICATION_SERVER_API}${AUTHENTICATION_ROUTES.selfRegister}`
  );
};
