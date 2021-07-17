export interface IChartItem {
  origin: string;
  totalValue: number;
}

export interface IReportError {
  message: string;
  err: any;
}

export interface IConfigs {
  allowCharts?: boolean;
  allowExport?: boolean;
}
