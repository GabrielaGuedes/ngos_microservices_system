import { postRequest } from "../../utils/requests";
import { MARKETING_ROUTES } from "./routes";
import { IFilesAdded } from "./types";

export const addFiles = async (): Promise<IFilesAdded> => {
  return await postRequest(`${MARKETING_ROUTES.fileUploads}/add`, {});
};
