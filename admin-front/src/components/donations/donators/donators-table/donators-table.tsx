import React from "react";
import { IDonator } from "../../../../requests/donations/types";
import Table from "../../../../ui-components/table/table";
import RowDetails from "./row-details/row-details";

interface IDonatorsTable {
  donators: IDonator[];
}

const DonatorsTable: React.FC<IDonatorsTable> = ({ donators }) => {
  const columnsRender = [
    {
      property: "name",
      header: <b>Nome</b>,
      align: "center",
      search: true,
    },
    {
      property: "donatedValue",
      header: <b>Total doado</b>,
      render: (datum: IDonator) =>
        `R$ ${datum.donatedValue.toString().replace(".", ",")}`,
      align: "center",
      search: true,
    },
    {
      property: "updatedAt",
      header: <b>Última doação</b>,
      render: (datum: IDonator) =>
        new Date(datum.updatedAt).toLocaleDateString(),
      align: "center",
      search: true,
    },
    {
      property: "city",
      header: <b>Cidade</b>,
      align: "center",
      search: true,
    },
    {
      property: "birthDate",
      header: <b>Data de nascimento</b>,
      render: (datum: IDonator) =>
        new Date(datum.birthDate).toLocaleDateString(),
      align: "center",
      search: true,
    },
  ];

  return (
    <Table
      data={donators}
      columnsRender={columnsRender}
      rowDetails={(row) => <RowDetails row={row} />}
    />
  );
};

export default DonatorsTable;
