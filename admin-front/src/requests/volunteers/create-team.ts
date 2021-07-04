import { postRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerTeam, INewVolunteerTeam } from "./types";

export const createTeam = async (
  data: INewVolunteerTeam
): Promise<IVolunteerTeam> => {
  return await postRequest(VOLUNTEERS_ROUTES.teams, data);
};
