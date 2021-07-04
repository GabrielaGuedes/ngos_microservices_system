import { deleteRequest } from "../../utils/requests";
import { IDestroy } from "../common-types";
import { EMPLOYEES_ROUTES } from "./routes";

export const deleteArea = async (id: string | number): Promise<IDestroy> => {
  return await deleteRequest(`${EMPLOYEES_ROUTES.areas}/${id}`);
};
