import { deleteRequest } from "../../utils/requests";
import { IDestroy } from "../common-types";
import { MARKETING_ROUTES } from "./routes";

export const deletePost = async (id: string | number): Promise<IDestroy> => {
  return await deleteRequest(`${MARKETING_ROUTES.posts}/${id}`);
};
