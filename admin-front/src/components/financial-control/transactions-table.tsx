import React from "react";
import { ITransaction } from "../../requests/financial-control/types";
import Table from "../../ui-components/table/table";
import EditTransactionButton from "./edit-transaction-button";
import DeleteTransactionButton from "./delete-transaction-button";
import RowDetails from "./row-details";

interface ITransactionsTable {
  transactions: ITransaction[];
  refreshData: () => void;
}

const TransactionTable: React.FC<ITransactionsTable> = ({
  transactions,
  refreshData,
}) => {
  const columnsRender = [
    {
      property: "kind",
      header: <b>Tipo</b>,
      render: (datum: ITransaction) =>
        `${datum.kind === "IN" ? "Entrada" : "Saída"}`,
      align: "center",
    },
    {
      property: "value",
      header: <b>Valor</b>,
      render: (datum: ITransaction) => `R$ ${datum.value}`,
      align: "center",
      search: true,
    },
    {
      property: "date",
      header: <b>Data</b>,
      render: (datum: ITransaction) =>
        new Date(datum.date).toLocaleDateString(),
      align: "center",
      search: true,
    },
    {
      property: "origin",
      header: <b>Origem</b>,
      align: "center",
      search: true,
    },
    {
      property: "recurrent",
      header: <b>Recorrente?</b>,
      render: (datum: ITransaction) => `${datum.recurrent ? "Sim" : "Não"}`,
      align: "center",
      sortable: true,
    },
    {
      property: "",
      header: "",
      render: (row: ITransaction) => (
        <div style={{ display: "flex" }}>
          <EditTransactionButton transaction={row} refreshData={refreshData} />
          <DeleteTransactionButton
            key={`delete-${row.id}-transaction-button`}
            id={row.id}
            value={row.value}
            refreshData={refreshData}
          />
        </div>
      ),
      align: "center",
      sortable: false,
    },
  ];

  return (
    <Table
      data={transactions}
      columnsRender={columnsRender}
      rowDetails={(row) => <RowDetails row={row} />}
    />
  );
};

export default TransactionTable;
