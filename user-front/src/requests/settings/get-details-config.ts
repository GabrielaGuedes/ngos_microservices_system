import { getRequest } from "../../utils/requests";
import { SETTINGS_ROUTES } from "./routes";
import { IDetailsConfig } from "./types";

export const getDetails = async (): Promise<IDetailsConfig> => {
  return await getRequest(SETTINGS_ROUTES.details);
};
