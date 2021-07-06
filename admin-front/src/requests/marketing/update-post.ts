import { putRequest } from "../../utils/requests";
import { MARKETING_ROUTES } from "./routes";
import { INewPost, IPost } from "./types";

export const updatePost = async (
  data: INewPost,
  id: string | number
): Promise<IPost> => {
  return await putRequest(`${MARKETING_ROUTES.posts}/${id}`, data);
};
