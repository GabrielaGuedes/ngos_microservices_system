import { getRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeTeam } from "./types";

export const getTeam = async (id: string | number): Promise<IEmployeeTeam> => {
  return await getRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.teams}/${id}`
  );
};
