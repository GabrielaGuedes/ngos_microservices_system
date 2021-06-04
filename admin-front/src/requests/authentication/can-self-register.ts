import { getRequest } from "../../utils/requests";
import { ISelfRegister } from "./types";

const SELF_REGISTER_ROUTE = "/can-self-register";

export const canSelfRegister = async (): Promise<ISelfRegister> => {
  return await getRequest(
    `${process.env.REACT_APP_AUTHENTICATION_SERVER_API}${SELF_REGISTER_ROUTE}`
  );
};
