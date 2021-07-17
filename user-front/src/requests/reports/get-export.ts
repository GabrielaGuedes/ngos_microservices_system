import { getRequest } from "../../utils/requests";
import { REPORTS_ROUTES } from "./routes";

export const getExport = async (): Promise<any> => {
  return getRequest(`${REPORTS_ROUTES.reports}/export`);
};
