import { getRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeArea, IEmployeeAreasFilters } from "./types";

export const getAreas = async (
  filters?: IEmployeeAreasFilters
): Promise<IEmployeeArea[]> => {
  return await getRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.areas}`,
    filters
  );
};
