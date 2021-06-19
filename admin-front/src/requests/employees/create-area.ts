import { postRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeArea, INewEmployeeArea } from "./types";

export const createArea = async (
  data: INewEmployeeArea
): Promise<IEmployeeArea> => {
  return await postRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.areas}`,
    data
  );
};
