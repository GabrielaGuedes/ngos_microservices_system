import { getRequest } from "../../utils/requests";
import { DONATIONS_ROUTES } from "./routes";
import { IDonations, IDonationsFilters } from "./types";

export const getDonations = async (
  filters?: IDonationsFilters
): Promise<IDonations> => {
  return await getRequest(
    `${process.env.REACT_APP_DONATIONS_SERVER_API}${DONATIONS_ROUTES.donations}`,
    filters
  );
};
