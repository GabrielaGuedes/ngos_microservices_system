import { postRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { INewProject, IProject } from "./types";

export const createProject = async (data: INewProject): Promise<IProject> => {
  return await postRequest(PROJECTS_ROUTES.projects, data);
};
