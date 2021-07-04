import { getRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { IProject } from "./types";

export const getProject = async (id: string | number): Promise<IProject> => {
  return await getRequest(`${PROJECTS_ROUTES.projects}/${id}`);
};
