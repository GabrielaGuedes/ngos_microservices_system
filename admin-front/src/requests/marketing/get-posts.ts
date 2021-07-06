import { getRequest } from "../../utils/requests";
import { MARKETING_ROUTES } from "./routes";
import { IPost, IPostFilters } from "./types";

export const getPosts = async (filters?: IPostFilters): Promise<IPost[]> => {
  return await getRequest(MARKETING_ROUTES.posts, filters);
};
