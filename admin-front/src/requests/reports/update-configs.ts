import { postRequest } from "../../utils/requests";
import { REPORTS_ROUTES } from "./routes";
import { IConfigs } from "./types";

export const updateConfigs = async (data: IConfigs): Promise<IConfigs> => {
  return await postRequest(REPORTS_ROUTES.configs, data);
};
