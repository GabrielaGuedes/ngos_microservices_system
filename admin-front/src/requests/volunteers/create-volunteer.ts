import { postRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteer, INewVolunteer } from "./types";

export const createVolunteer = async (
  data: INewVolunteer
): Promise<IVolunteer> => {
  return await postRequest(VOLUNTEERS_ROUTES.volunteers, data);
};
