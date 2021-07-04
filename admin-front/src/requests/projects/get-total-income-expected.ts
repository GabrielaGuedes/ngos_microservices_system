import { getRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { IProjectsFilters, ITotalIncomeExpected } from "./types";

export const getTotalIncomeExpected = async (
  filters?: IProjectsFilters
): Promise<ITotalIncomeExpected> => {
  return await getRequest(PROJECTS_ROUTES.totalIncomeExpected, filters);
};
