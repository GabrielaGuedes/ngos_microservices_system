import { getRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerTeam } from "./types";

export const getTeam = async (id: string | number): Promise<IVolunteerTeam> => {
  return await getRequest(
    `${process.env.REACT_APP_VOLUNTEERS_SERVER_API}${VOLUNTEERS_ROUTES.teams}/${id}`
  );
};
