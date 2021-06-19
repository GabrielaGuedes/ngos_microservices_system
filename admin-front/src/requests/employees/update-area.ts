import { putRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeArea, INewEmployeeArea } from "./types";

export const updateArea = async (
  data: INewEmployeeArea,
  id: string | number
): Promise<IEmployeeArea> => {
  return await putRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.areas}/${id}`,
    data
  );
};
