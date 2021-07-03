import { getRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import { IRecurrent } from "./types";

export const getRecurrence = async (): Promise<IRecurrent> => {
  return await getRequest(
    `${FINANCIAL_CONTROL_ROUTES.totals}/recurrent-transactions`
  );
};
