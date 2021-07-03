import { getRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import { IGoal } from "./types";

export const getGoal = async (id: string | number): Promise<IGoal> => {
  return await getRequest(`${FINANCIAL_CONTROL_ROUTES.goals}/${id}`);
};
