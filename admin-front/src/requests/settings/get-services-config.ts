import { getRequest } from "../../utils/requests";
import { SETTINGS_ROUTES } from "./routes";
import { IServicesConfig } from "./types";

export const getServices = async (): Promise<IServicesConfig> => {
  return await getRequest(SETTINGS_ROUTES.services);
};
