import { postRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerArea, INewVolunteerArea } from "./types";

export const createArea = async (
  data: INewVolunteerArea
): Promise<IVolunteerArea> => {
  return await postRequest(
    `${process.env.REACT_APP_VOLUNTEERS_SERVER_API}${VOLUNTEERS_ROUTES.areas}`,
    data
  );
};
