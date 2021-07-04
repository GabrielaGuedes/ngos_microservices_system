import { postRequest } from "../../utils/requests";
import { SETTINGS_ROUTES } from "./routes";
import { IServicesConfig } from "./types";

export const updateServicesConfig = async (
  data: IServicesConfig
): Promise<IServicesConfig> => {
  return await postRequest(SETTINGS_ROUTES.services, data);
};
