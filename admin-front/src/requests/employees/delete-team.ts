import { deleteRequest } from "../../utils/requests";
import { IDestroy } from "../common-types";
import { EMPLOYEES_ROUTES } from "./routes";

export const deleteTeam = async (id: string | number): Promise<IDestroy> => {
  return await deleteRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${EMPLOYEES_ROUTES.teams}/${id}`
  );
};
