import { postDataRequest } from "../../utils/requests";
import { MARKETING_ROUTES } from "./routes";
import { IFilesAdded } from "./types";

export const addFiles = async (files: []): Promise<IFilesAdded> => {
  return await postDataRequest(
    `${MARKETING_ROUTES.fileUploads}/add`,
    files,
    "multiple_files"
  );
};
