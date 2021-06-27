import { getRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { IProject, IProjectsFilters } from "./types";

export const getProjects = async (
  filters?: IProjectsFilters
): Promise<IProject[]> => {
  return await getRequest(
    `${process.env.REACT_APP_PROJECTS_SERVER_API}${PROJECTS_ROUTES.projects}`,
    filters
  );
};
