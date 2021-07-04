import { getRequest } from "../../utils/requests";
import { DONATIONS_ROUTES } from "./routes";
import { IDonations, IDonationsFilters } from "./types";

export const getDonations = async (
  filters?: IDonationsFilters
): Promise<IDonations> => {
  return await getRequest(DONATIONS_ROUTES.donations, filters);
};
