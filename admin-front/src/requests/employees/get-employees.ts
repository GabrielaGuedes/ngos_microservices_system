import { getRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployee, IEmployeesFilters } from "./types";

export const getEmployees = async (
  filters?: IEmployeesFilters
): Promise<IEmployee[]> => {
  return await getRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.employees}`,
    filters
  );
};
