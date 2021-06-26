import { putRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerArea, INewVolunteerArea } from "./types";

export const updateArea = async (
  data: INewVolunteerArea,
  id: string | number
): Promise<IVolunteerArea> => {
  return await putRequest(
    `${process.env.REACT_APP_VOLUNTEERS_SERVER_API}${VOLUNTEERS_ROUTES.areas}/${id}`,
    data
  );
};
