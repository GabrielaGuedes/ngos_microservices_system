import { getRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerArea, IVolunteerAreasFilters } from "./types";

export const getAreas = async (
  filters?: IVolunteerAreasFilters
): Promise<IVolunteerArea[]> => {
  return await getRequest(VOLUNTEERS_ROUTES.areas, filters);
};
