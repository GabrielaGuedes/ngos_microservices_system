import { getRequest } from "../../utils/requests";
import { PROJECTS_ROUTES } from "./routes";
import { IProject } from "./types";

export const getProject = async (id: string | number): Promise<IProject> => {
  return await getRequest(
    `${process.env.REACT_APP_PROJECTS_SERVER_API}${PROJECTS_ROUTES.projects}/${id}`
  );
};
