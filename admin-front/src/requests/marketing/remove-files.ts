import { postRequest } from "../../utils/requests";
import { IDestroy } from "../common-types";
import { MARKETING_ROUTES } from "./routes";
import { IRemoveFiles } from "./types";

export const removeFiles = async (data: IRemoveFiles): Promise<IDestroy> => {
  return await postRequest(`${MARKETING_ROUTES.fileUploads}/remove`, data);
};
