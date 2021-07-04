import React from "react";
import { IVolunteer } from "../../../requests/volunteers/types";
import Table from "../../../ui-components/table/table";
import RowDetails from "./row-details";
import EditVolunteerButton from "./edit-volunteer-button";
import DeleteVolunteerButton from "./delete-volunteer-button";

interface IVolunteersTable {
  volunteers: IVolunteer[];
  refreshTable: () => void;
}

const VolunteersTable: React.FC<IVolunteersTable> = ({
  volunteers,
  refreshTable,
}) => {
  const columnsRender = [
    {
      property: "name",
      header: <b>Nome</b>,
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
      property: "areas",
      header: <b>Áreas</b>,
      render: (datum: IVolunteer) =>
        `${datum.areas.map((area) => area.name).join(", ")}`,
      align: "center",
      sortable: false,
    },
    {
      property: "teams",
      header: <b>Times</b>,
      render: (datum: IVolunteer) =>
        `${datum.teams.map((team) => team.name).join(", ")}`,
      align: "center",
      sortable: false,
    },
    {
      property: "",
      header: "",
      render: (row: IVolunteer) => (
        <div style={{ display: "flex" }}>
          <EditVolunteerButton volunteer={row} refreshTable={refreshTable} />
          <DeleteVolunteerButton
            key={`delete-${row.id}-volunteer-button`}
            id={row.id}
            name={row.name}
            refreshTable={refreshTable}
          />
        </div>
      ),
      align: "center",
      sortable: false,
    },
  ];

  return (
    <Table
      data={volunteers}
      columnsRender={columnsRender}
      rowDetails={(row) => <RowDetails row={row} />}
    />
  );
};

export default VolunteersTable;
