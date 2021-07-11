import { deleteRequest } from "../../utils/requests";
import { IDestroy } from "../common-types";
import { INVOICES_ROUTES } from "./routes";

export const deleteInvoice = async (id: string | number): Promise<IDestroy> => {
  return await deleteRequest(`${INVOICES_ROUTES.invoices}/${id}`);
};
