import { getRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerArea, IVolunteerAreasFilters } from "./types";

export const getAreas = async (
  filters?: IVolunteerAreasFilters
): Promise<IVolunteerArea[]> => {
  return await getRequest(
    `${process.env.REACT_APP_VOLUNTEERS_SERVER_API}${VOLUNTEERS_ROUTES.areas}`,
    filters
  );
};
