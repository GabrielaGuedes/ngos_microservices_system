import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getCharts } from "../../requests/reports/get-charts";
import { getConfigs } from "../../requests/reports/get-configs";
import { REPORTS_ROUTES } from "../../requests/reports/routes";
import { IChartItem, IConfigs } from "../../requests/reports/types";
import Button from "../../ui-components/button/button";
import EmptyState from "../../ui-components/empty-state/empty-state";
import { errorToast } from "../../ui-components/toasts/toasts";
import { Subtitle } from "../donations/donations.style";
import LabelledChartBar from "./labelled-chart-bar";
import {
  Chart,
  ChartContainer,
  ExportContainer,
  ReportsStyled,
} from "./reports.style";

interface IReports {}

const Reports: React.FC<IReports> = () => {
  const [chartItems, setChartItems] = useState<IChartItem[] | null>(null);
  const [configs, setConfigs] = useState<IConfigs | null>(null);

  useEffect(() => {
    getConfigs()
      .then((res) => {
        setConfigs(res);
        if (res.allowCharts) {
          getCharts()
            .then((res) => setChartItems(res))
            .catch(() => errorToast());
        }
      })
      .catch(() => errorToast());
  }, []);

  return (
    <ReportsStyled>
      <Subtitle>
        Aqui você pode ver como administramos nosso dinheiro :)
      </Subtitle>
      <ExportContainer>
        Baixe a nossa planilha com as entradas e saídas
        {configs?.allowExport && (
          <a href={`${REPORTS_ROUTES.reports}/export`}>
            <Button>Download</Button>
          </a>
        )}
      </ExportContainer>
      {chartItems && (
        <ChartContainer>
          <Chart>
            {chartItems.length > 0 ? (
              chartItems.map((item) => (
                <LabelledChartBar label={item.origin} value={item.totalValue} />
              ))
            ) : (
              <EmptyState />
            )}
          </Chart>
          Nossas transações organizadas por origem
        </ChartContainer>
      )}
    </ReportsStyled>
  );
};

export default Reports;
