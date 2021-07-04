import { getRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteer } from "./types";

export const getVolunteer = async (
  id: string | number
): Promise<IVolunteer> => {
  return await getRequest(`${VOLUNTEERS_ROUTES.volunteers}/${id}`);
};
