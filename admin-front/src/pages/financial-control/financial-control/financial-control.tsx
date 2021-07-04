import React from "react";
import { Fragment } from "react";
import { PageTitle } from "../../../ui-components/typography/page-title";
import { Tab, Tabs } from "grommet";
import { TabContentContainer } from "../../../ui-components/base-containers/base-containers";
import Transactions from "../../../components/financial-control/transactions";
import TransactionsGroupedByOrigin from "../../../components/financial-control/transactions-grouped-by-origin";
import {
  FinancialControlStyled,
  TransactionsContainer,
  StatusContainer,
} from "./financial-control.style";
import StatusCards from "../../../components/financial-control/status-cards";

interface IFinancialControl {}

const FinancialControl: React.FC<IFinancialControl> = () => {
  return (
    <Fragment>
      <PageTitle>Controle financeiro - Entradas e saídas</PageTitle>
      <FinancialControlStyled>
        <TransactionsContainer>
          <Tabs alignControls="start">
            <Tab title="Todas">
              <TabContentContainer>
                <Transactions />
              </TabContentContainer>
            </Tab>
            <Tab title="Agrupadas por origem">
              <TabContentContainer>
                <TransactionsGroupedByOrigin />
              </TabContentContainer>
            </Tab>
          </Tabs>
        </TransactionsContainer>
        <StatusContainer>
          <StatusCards />
        </StatusContainer>
      </FinancialControlStyled>
    </Fragment>
  );
};

export default FinancialControl;
