import { deleteRequest } from "../../utils/requests";
import { IDestroy } from "../common-types";
import { VOLUNTEERS_ROUTES } from "./routes";

export const deleteVolunteer = async (
  id: string | number
): Promise<IDestroy> => {
  return await deleteRequest(
    `${process.env.REACT_APP_VOLUNTEERS_SERVER_API}${VOLUNTEERS_ROUTES.volunteers}/${id}`
  );
};
