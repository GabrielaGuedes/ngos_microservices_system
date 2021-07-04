import { getRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { IProject, IProjectsFilters } from "./types";

export const getProjects = async (
  filters?: IProjectsFilters
): Promise<IProject[]> => {
  return await getRequest(PROJECTS_ROUTES.projects, filters);
};
