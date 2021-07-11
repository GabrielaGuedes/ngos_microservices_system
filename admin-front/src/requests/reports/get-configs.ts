import { getRequest } from "../../utils/requests";
import { REPORTS_ROUTES } from "./routes";
import { IConfigs } from "./types";

export const getConfigs = async (): Promise<IConfigs> => {
  return await getRequest(REPORTS_ROUTES.configs);
};
