import { postRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteer, INewVolunteer } from "./types";

export const createVolunteer = async (
  data: INewVolunteer
): Promise<IVolunteer> => {
  return await postRequest(
    `${process.env.REACT_APP_VOLUNTEERS_SERVER_API}${VOLUNTEERS_ROUTES.volunteers}`,
    data
  );
};
