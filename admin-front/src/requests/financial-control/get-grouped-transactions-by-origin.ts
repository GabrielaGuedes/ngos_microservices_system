import { getRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import {
  IGroupedTransactionByOrigin,
  IGroupedTransactionByOriginFilters,
} from "./types";

export const getGroupedTransactionsByOrigin = async (
  filters?: IGroupedTransactionByOriginFilters
): Promise<IGroupedTransactionByOrigin[]> => {
  return await getRequest(
    `${FINANCIAL_CONTROL_ROUTES.groupedTransactions}/by-origin`,
    filters
  );
};
