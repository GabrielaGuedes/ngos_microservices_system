import { postRequest } from "../../utils/requests";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";
import { INewGoal, IGoal } from "./types";

export const createGoal = async (data: INewGoal): Promise<IGoal> => {
  return await postRequest(FINANCIAL_CONTROL_ROUTES.goals, data);
};
