import { getRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerTeam, IVolunteerTeamsFilters } from "./types";

export const getTeams = async (
  filters?: IVolunteerTeamsFilters
): Promise<IVolunteerTeam[]> => {
  return await getRequest(
    `${process.env.REACT_APP_VOLUNTEERS_SERVER_API}${VOLUNTEERS_ROUTES.teams}`,
    filters
  );
};
