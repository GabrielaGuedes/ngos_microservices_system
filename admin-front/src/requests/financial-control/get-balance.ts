import { getRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import { IBalance } from "./types";

export const getBalance = async (): Promise<IBalance> => {
  return await getRequest(`${FINANCIAL_CONTROL_ROUTES.totals}/current-value`);
};
