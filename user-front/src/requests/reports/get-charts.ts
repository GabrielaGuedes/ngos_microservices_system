import { getRequest } from "../../utils/requests";
import { REPORTS_ROUTES } from "./routes";
import { IChartItem } from "./types";

export const getCharts = async (): Promise<IChartItem[]> => {
  return getRequest(`${REPORTS_ROUTES.reports}/charts`);
};
