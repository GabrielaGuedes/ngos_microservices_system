import { getRequest } from "../../utils/requests";
import { INVOICES_ROUTES } from "./routes";
import { IInvoice } from "./types";

export const getInvoice = async (id: string | number): Promise<IInvoice> => {
  return await getRequest(`${INVOICES_ROUTES.invoices}/${id}`);
};
