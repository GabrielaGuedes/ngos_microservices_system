import React from "react";
import { IGroupedTransactionByOrigin } from "../../requests/financial-control/types";
import Table from "../../ui-components/table/table";

interface IGroupedTransactionsTable {
  groupedTransactions: IGroupedTransactionByOrigin[];
}

const GroupedTransactions: React.FC<IGroupedTransactionsTable> = ({
  groupedTransactions,
}) => {
  const columnsRender = [
    {
      property: "origin",
      header: <b>Origem</b>,
      align: "center",
      search: true,
    },
    {
      property: "totalValue",
      header: <b>Valor total</b>,
      render: (datum: IGroupedTransactionByOrigin) => `R$ ${datum.totalValue}`,
      align: "center",
      search: true,
    },
  ];

  return <Table data={groupedTransactions} columnsRender={columnsRender} />;
};

export default GroupedTransactions;
