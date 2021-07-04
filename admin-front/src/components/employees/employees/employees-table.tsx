import React from "react";
import { IEmployee } from "../../../requests/employees/types";
import Table from "../../../ui-components/table/table";
import RowDetails from "./row-details";
import EditEmployeeButton from "./edit-employee-button";
import DeleteEmployeeButton from "./delete-employee-button";

interface IEmployeesTable {
  employees: IEmployee[];
  refreshTable: () => void;
}

const EmployeesTable: React.FC<IEmployeesTable> = ({
  employees,
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
      property: "occupation",
      header: <b>Cargo</b>,
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
      render: (datum: IEmployee) =>
        `${datum.areas.map((area) => area.name).join(", ")}`,
      align: "center",
      sortable: false,
    },
    {
      property: "teams",
      header: <b>Times</b>,
      render: (datum: IEmployee) =>
        `${datum.teams.map((team) => team.name).join(", ")}`,
      align: "center",
      sortable: false,
    },
    {
      property: "",
      header: "",
      render: (row: IEmployee) => (
        <div style={{ display: "flex" }}>
          <EditEmployeeButton employee={row} refreshTable={refreshTable} />
          <DeleteEmployeeButton
            key={`delete-${row.id}-employee-button`}
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
      data={employees}
      columnsRender={columnsRender}
      rowDetails={(row) => <RowDetails row={row} />}
    />
  );
};

export default EmployeesTable;
