import { getRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployee } from "./types";

export const getEmployee = async (id: string | number): Promise<IEmployee> => {
  return await getRequest(`${EMPLOYEES_ROUTES.employees}/${id}`);
};
