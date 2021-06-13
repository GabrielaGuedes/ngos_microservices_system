import { getRequest } from "../../utils/requests";
import { DONATIONS_ROUTES } from "./routes";
import { IDonator, IDonatorsFilters } from "./types";

export const getDonators = async (
  filters?: IDonatorsFilters
): Promise<IDonator[]> => {
  return await getRequest(
    `${process.env.REACT_APP_DONATIONS_SERVER_API}${DONATIONS_ROUTES.donators}`,
    filters
  );
};
