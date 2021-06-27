import { getRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { IProjectsFilters, ITotalIncomeExpected } from "./types";

export const getTotalIncomeExpected = async (
  filters?: IProjectsFilters
): Promise<ITotalIncomeExpected> => {
  return await getRequest(
    `${process.env.REACT_APP_PROJECTS_SERVER_API}${PROJECTS_ROUTES.totalIncomeExpected}`,
    filters
  );
};
