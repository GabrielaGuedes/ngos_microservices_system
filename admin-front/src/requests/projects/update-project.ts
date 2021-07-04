import { putRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { INewProject, IProject } from "./types";

export const updateProject = async (
  data: INewProject,
  id: string | number
): Promise<IProject> => {
  return await putRequest(`${PROJECTS_ROUTES.projects}/${id}`, data);
};
