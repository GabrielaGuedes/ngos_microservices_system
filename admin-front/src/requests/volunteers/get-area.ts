import { getRequest } from "../../utils/requests";
import { VOLUNTEERS_ROUTES } from "./routes";
import { IVolunteerArea } from "./types";

export const getArea = async (id: string | number): Promise<IVolunteerArea> => {
  return await getRequest(
    `${process.env.REACT_APP_VOLUNTEERS_SERVER_API}${VOLUNTEERS_ROUTES.areas}/${id}`
  );
};
