import { getRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import { ITransaction, ITransactionFilters } from "./types";

export const getTransactions = async (
  filters?: ITransactionFilters
): Promise<ITransaction[]> => {
  return await getRequest(FINANCIAL_CONTROL_ROUTES.transactions, filters);
};
