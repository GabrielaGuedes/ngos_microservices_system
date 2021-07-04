import { postRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerArea, INewVolunteerArea } from "./types";

export const createArea = async (
  data: INewVolunteerArea
): Promise<IVolunteerArea> => {
  return await postRequest(VOLUNTEERS_ROUTES.areas, data);
};
