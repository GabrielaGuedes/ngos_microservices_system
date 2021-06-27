import { putRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { INewProject, IProject } from "./types";

export const updateProject = async (
  data: INewProject,
  id: string | number
): Promise<IProject> => {
  return await putRequest(
    `${process.env.REACT_APP_PROJECTS_SERVER_API}${PROJECTS_ROUTES.projects}/${id}`,
    data
  );
};
