import { deleteRequest } from "../../utils/requests";
import { IDestroy } from "../common-types";
import { FINANCIAL_CONTROL_ROUTES } from "./routes";

export const deleteGoal = async (id: string | number): Promise<IDestroy> => {
  return await deleteRequest(`${FINANCIAL_CONTROL_ROUTES.goals}/${id}`);
};
