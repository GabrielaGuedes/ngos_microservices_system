import { postRequest } from "../../utils/requests";
import { DONATIONS_ROUTES } from "./routes";
import { IChargeCreated, IChargeCreditCard } from "./types";

export const chargeCreditCard = async (
  data: IChargeCreditCard
): Promise<IChargeCreated> => {
  return postRequest(`${DONATIONS_ROUTES.donations}/charge-credit-card`, data);
};
