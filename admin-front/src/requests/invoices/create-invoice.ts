import { postRequest } from "../../utils/requests";
import { INVOICES_ROUTES } from "./routes";
import { IInvoice, INewInvoice } from "./types";

export const createInvoice = async (data: INewInvoice): Promise<IInvoice> => {
  return await postRequest(INVOICES_ROUTES.invoices, data);
};
