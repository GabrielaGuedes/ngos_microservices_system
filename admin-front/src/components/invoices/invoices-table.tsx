import React from "react";
import Table from "../../ui-components/table/table";
import EditInvoiceButton from "./edit-invoice-button";
import DeleteInvoiceButton from "./delete-invoice-button";
import { IInvoice } from "../../requests/invoices/types";

interface IInvoicesTable {
  invoices: IInvoice[];
  refreshData: () => void;
}

const InvoicesTable: React.FC<IInvoicesTable> = ({ invoices, refreshData }) => {
  const columnsRender = [
    {
      property: "donatorName",
      header: <b>Nome do doador</b>,
      align: "center",
      search: true,
    },
    {
      property: "donatorEmail",
      header: <b>Email do doador</b>,
      align: "center",
      search: true,
    },
    {
      property: "donationDate",
      header: <b>Data de doação</b>,
      render: (datum: IInvoice) =>
        new Date(datum.donationDate).toLocaleDateString(),
      align: "center",
      search: true,
    },
    {
      property: "",
      header: "",
      render: (row: IInvoice) => (
        <div style={{ display: "flex" }}>
          <EditInvoiceButton invoice={row} refreshData={refreshData} />
          <DeleteInvoiceButton
            key={`delete-${row._id}-invoice-button`}
            id={row._id}
            donatorName={row.donatorName}
            refreshData={refreshData}
          />
        </div>
      ),
      align: "center",
      sortable: false,
    },
  ];

  return <Table data={invoices} columnsRender={columnsRender} />;
};

export default InvoicesTable;
