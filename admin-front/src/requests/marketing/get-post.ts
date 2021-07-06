import { getRequest } from "../../utils/requests";
import { ITransaction } from "../financial-control/types";
import { MARKETING_ROUTES } from "./routes";

export const getPost = async (id: string | number): Promise<ITransaction> => {
  return await getRequest(`${MARKETING_ROUTES.posts}/${id}`);
};
