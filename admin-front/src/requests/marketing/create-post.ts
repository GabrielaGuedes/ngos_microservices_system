import { postRequest } from "../../utils/requests";
import { MARKETING_ROUTES } from "./routes";
import { INewPost, IPost } from "./types";

export const createPost = async (data: INewPost): Promise<IPost> => {
  return await postRequest(MARKETING_ROUTES.posts, data);
};
