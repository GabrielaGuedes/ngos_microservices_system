import { putRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import { INewTransaction, ITransaction } from "./types";

export const updateTransaction = async (
  data: INewTransaction,
  id: string | number
): Promise<ITransaction> => {
  return await putRequest(
    `${FINANCIAL_CONTROL_ROUTES.transactions}/${id}`,
    data
  );
};
