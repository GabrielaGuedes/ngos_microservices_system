import { putRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerArea, INewVolunteerArea } from "./types";

export const updateArea = async (
  data: INewVolunteerArea,
  id: string | number
): Promise<IVolunteerArea> => {
  return await putRequest(`${VOLUNTEERS_ROUTES.areas}/${id}`, data);
};
