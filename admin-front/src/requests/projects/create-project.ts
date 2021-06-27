import { postRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { INewProject, IProject } from "./types";

export const createProject = async (data: INewProject): Promise<IProject> => {
  return await postRequest(
    `${process.env.REACT_APP_PROJECTS_SERVER_API}${PROJECTS_ROUTES.projects}`,
    data
  );
};
