import { putRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import { INewGoal, IGoal } from "./types";

export const updateGoal = async (
  data: INewGoal,
  id: string | number
): Promise<IGoal> => {
  return await putRequest(`${FINANCIAL_CONTROL_ROUTES.goals}/${id}`, data);
};
