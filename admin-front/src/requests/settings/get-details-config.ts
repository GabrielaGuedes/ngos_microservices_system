import { getRequest } from "../../utils/requests";
import { SETTINGS_ROUTES } from "./routes";
import { IDetailsConfig } from "./types";

export const getDetails = async (): Promise<IDetailsConfig> => {
  return await getRequest(
    `${process.env.REACT_APP_SETTINGS_SERVER_API}${SETTINGS_ROUTES.details}`
  );
};
