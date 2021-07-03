const baseUrl = process.env.REACT_APP_FINANCIAL_CONTROL_SERVER_API;

export const FINANCIAL_CONTROL_ROUTES = {
  transactions: baseUrl + "/transactions",
  goals: baseUrl + "/goals",
  groupedTransactions: baseUrl + "/grouped-transactions",
  totals: baseUrl + "/totals",
};
