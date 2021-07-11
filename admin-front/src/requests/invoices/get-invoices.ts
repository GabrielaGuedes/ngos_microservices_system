import { getRequest } from "../../utils/requests";
import { INVOICES_ROUTES } from "./routes";
import { IInvoice, IInvoicesFilters } from "./types";

export const getInvoices = async (
  filters?: IInvoicesFilters
): Promise<IInvoice[]> => {
  return await getRequest(INVOICES_ROUTES.invoices, filters);
};
