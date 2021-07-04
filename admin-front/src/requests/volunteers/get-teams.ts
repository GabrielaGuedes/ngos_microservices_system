import { getRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerTeam, IVolunteerTeamsFilters } from "./types";

export const getTeams = async (
  filters?: IVolunteerTeamsFilters
): Promise<IVolunteerTeam[]> => {
  return await getRequest(VOLUNTEERS_ROUTES.teams, filters);
};
