import { putRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerTeam, INewVolunteerTeam } from "./types";

export const updateTeam = async (
  data: INewVolunteerTeam,
  id: string | number
): Promise<IVolunteerTeam> => {
  return await putRequest(`${VOLUNTEERS_ROUTES.teams}/${id}`, data);
};
