import { putRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteer, INewVolunteer } from "./types";

export const updateVolunteer = async (
  data: INewVolunteer,
  id: string | number
): Promise<IVolunteer> => {
  return await putRequest(
    `${process.env.REACT_APP_VOLUNTEERS_SERVER_API}${VOLUNTEERS_ROUTES.volunteers}/${id}`,
    data
  );
};
