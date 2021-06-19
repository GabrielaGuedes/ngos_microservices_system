import { getRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeArea } from "./types";

export const getArea = async (id: string | number): Promise<IEmployeeArea> => {
  return await getRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.areas}/${id}`
  );
};
