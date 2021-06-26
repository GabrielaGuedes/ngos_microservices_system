import { getRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteer, IVolunteersFilters } from "./types";

export const getVolunteers = async (
  filters?: IVolunteersFilters
): Promise<IVolunteer[]> => {
  return await getRequest(
    `${process.env.REACT_APP_VOLUNTEERS_SERVER_API}${VOLUNTEERS_ROUTES.volunteers}`,
    filters
  );
};
