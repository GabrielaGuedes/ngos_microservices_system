import { getRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeArea, IEmployeeAreasFilters } from "./types";

export const getAreas = async (
  filters?: IEmployeeAreasFilters
): Promise<IEmployeeArea[]> => {
  return await getRequest(EMPLOYEES_ROUTES.areas, filters);
};
