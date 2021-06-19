import { getRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployee } from "./types";

export const getEmployee = async (id: string | number): Promise<IEmployee> => {
  return await getRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.employees}/${id}`
  );
};
