import { putRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployee, INewEmployee } from "./types";

export const updateEmployee = async (
  data: INewEmployee,
  id: string | number
): Promise<IEmployee> => {
  return await putRequest(`${EMPLOYEES_ROUTES.employees}/${id}`, data);
};
