import { deleteRequest } from "../../utils/requests";
import { IDestroy } from "../common-types";
import { PROJECTS_ROUTES } from "./routes";

export const deleteProject = async (id: string | number): Promise<IDestroy> => {
  return await deleteRequest(
    `${process.env.REACT_APP_EMPLOYEES_SERVER_API}${PROJECTS_ROUTES.projects}/${id}`
  );
};
