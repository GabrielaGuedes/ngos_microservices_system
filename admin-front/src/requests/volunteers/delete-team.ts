import { deleteRequest } from "../../utils/requests";
import { IDestroy } from "../common-types";
import { VOLUNTEERS_ROUTES } from "./routes";

export const deleteTeam = async (id: string | number): Promise<IDestroy> => {
  return await deleteRequest(`${VOLUNTEERS_ROUTES.teams}/${id}`);
};
