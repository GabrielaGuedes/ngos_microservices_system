import { getRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerArea } from "./types";

export const getArea = async (id: string | number): Promise<IVolunteerArea> => {
  return await getRequest(`${VOLUNTEERS_ROUTES.areas}/${id}`);
};
