import { getRequest } from "../../utils/requests";
import { SETTINGS_ROUTES } from "./routes";
import { IServicesConfig } from "./types";

export const getServices = async (): Promise<IServicesConfig> => {
  return await getRequest(
    `${process.env.REACT_APP_SETTINGS_SERVER_API}${SETTINGS_ROUTES.services}`
  );
};
