import { postRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployee, INewEmployee } from "./types";

export const createEmployee = async (
  data: INewEmployee
): Promise<IEmployee> => {
  return await postRequest(EMPLOYEES_ROUTES.employees, data);
};
