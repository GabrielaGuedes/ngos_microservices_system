import { getRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import { IGoal, IGoalFilters } from "./types";

export const getGoals = async (filters?: IGoalFilters): Promise<IGoal[]> => {
  return await getRequest(FINANCIAL_CONTROL_ROUTES.goals, filters);
};
