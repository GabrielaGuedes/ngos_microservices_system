import { postRequest } from "../../utils/requests";
import { EMPLOYEES_ROUTES } from "./routes";
import { IEmployeeTeam, INewEmployeeTeam } from "./types";

export const createTeam = async (
  data: INewEmployeeTeam
): Promise<IEmployeeTeam> => {
  return await postRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.teams}`,
    data
  );
};
