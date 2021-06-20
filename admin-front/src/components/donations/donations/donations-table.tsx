import React from "react";
import { IDonation } from "../../../requests/donations/types";
import Table from "../../../ui-components/table/table";
import { sources, status } from "../../../utils/mappers/donations-mapper";

interface IDonationsTable {
  donations: IDonation[];
}

const DonationsTable: React.FC<IDonationsTable> = ({ donations }) => {
  const columnsRender = [
    {
      property: "amount",
      header: <b>Valor</b>,
      render: (datum: IDonation) =>
        `R$ ${datum.amount.toString().replace(".", ",")}`,
      align: "center",
      search: true,
    },
    {
      property: "source",
      header: <b>Meio de pagamento</b>,
      render: (datum: IDonation) => sources[datum.source],
      align: "center",
      search: true,
    },
    {
      property: "status",
      header: <b>Status</b>,
      render: (datum: IDonation) => status[datum.status],
      align: "center",
      search: true,
    },
    {
      property: "createdAt",
      header: <b>Data</b>,
      render: (datum: IDonation) =>
        new Date(datum.createdAt).toLocaleDateString(),
      align: "center",
      search: true,
    },
    {
      property: "donatorEmail",
      header: <b>Doador</b>,
      align: "center",
      search: true,
    },
  ];

  return <Table data={donations} columnsRender={columnsRender} />;
};

export default DonationsTable;
