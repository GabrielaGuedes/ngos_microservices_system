import { deleteRequest } from "../../utils/requests";
import { IDestroy } from "../common-types";
import { PROJECTS_ROUTES } from "./routes";

export const deleteProject = async (id: string | number): Promise<IDestroy> => {
  return await deleteRequest(`${PROJECTS_ROUTES.projects}/${id}`);
};
