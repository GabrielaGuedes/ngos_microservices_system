import { getFileRequest } from "../../utils/requests";
import { MARKETING_ROUTES } from "./routes";

export const getFile = async (name: string): Promise<any> => {
  return await getFileRequest(`${MARKETING_ROUTES.filesPath}/${name}`);
};
