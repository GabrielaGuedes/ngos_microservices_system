import { postRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import { INewTransaction, ITransaction } from "./types";

export const createTransaction = async (
  data: INewTransaction
): Promise<ITransaction> => {
  return await postRequest(FINANCIAL_CONTROL_ROUTES.transactions, data);
};
