import { putRequest } from "../../utils/requests";
import { INVOICES_ROUTES } from "./routes";
import { IInvoice, INewInvoice } from "./types";

export const updateInvoice = async (
  data: INewInvoice,
  id: string | number
): Promise<IInvoice> => {
  return await putRequest(`${INVOICES_ROUTES.invoices}/${id}`, data);
};
