import { getRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { IProjectsFilters, ITotalCostExpected } from "./types";

export const getTotalCostExpected = async (
  filters?: IProjectsFilters
): Promise<ITotalCostExpected> => {
  return await getRequest(PROJECTS_ROUTES.totalCostExpected, filters);
};
