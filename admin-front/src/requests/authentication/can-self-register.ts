import { getRequest } from "../../utils/requests";
import { AUTHENTICATION_ROUTES } from "./routes";
import { ISelfRegister } from "./types";

export const canSelfRegister = async (): Promise<ISelfRegister> => {
  return await getRequest(AUTHENTICATION_ROUTES.selfRegister);
};
