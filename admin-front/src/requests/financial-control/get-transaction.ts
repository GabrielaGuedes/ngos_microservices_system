import { getRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import { ITransaction } from "./types";

export const getTransaction = async (
  id: string | number
): Promise<ITransaction> => {
  return await getRequest(`${FINANCIAL_CONTROL_ROUTES.transactions}/${id}`);
};
