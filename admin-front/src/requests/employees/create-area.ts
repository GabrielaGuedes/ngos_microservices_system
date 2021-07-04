import { postRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeArea, INewEmployeeArea } from "./types";

export const createArea = async (
  data: INewEmployeeArea
): Promise<IEmployeeArea> => {
  return await postRequest(EMPLOYEES_ROUTES.areas, data);
};
