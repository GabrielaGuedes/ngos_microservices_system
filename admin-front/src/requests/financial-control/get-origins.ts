import { getRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";

export const getOrigins = async (): Promise<string[]> => {
  return await getRequest(`${FINANCIAL_CONTROL_ROUTES.totals}/all-origins`);
};
