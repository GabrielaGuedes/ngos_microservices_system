import { getRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { IProjectsFilters, ITotalCostExpected } from "./types";

export const getTotalCostExpected = async (
  filters?: IProjectsFilters
): Promise<ITotalCostExpected> => {
  return await getRequest(
    `${process.env.REACT_APP_PROJECTS_SERVER_API}${PROJECTS_ROUTES.totalCostExpected}`,
    filters
  );
};
