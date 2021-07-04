import { postRequest } from "../../utils/requests";
import { SETTINGS_ROUTES } from "./routes";
import { IDetailsConfig } from "./types";

export const updateDetailsConfig = async (
  data: IDetailsConfig
): Promise<IDetailsConfig> => {
  return await postRequest(SETTINGS_ROUTES.details, data);
};
