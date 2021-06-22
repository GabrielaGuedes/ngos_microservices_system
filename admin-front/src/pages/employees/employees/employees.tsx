import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { getEmployees } from "../../../requests/employees/get-employees";
import {
  IEmployee,
  IEmployeesFilters,
} from "../../../requests/employees/types";
import Button from "../../../ui-components/button/button";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { PageTitle } from "../../../ui-components/typography/page-title";
import { SPACES } from "../../../ui-constants/sizes";
import { ButtonsContainer, AddNewButtons } from "./employee.style";
import EmployeesTable from "../../../components/employees/employees/employees-table";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import EditCreateEmployeeModal from "../../../components/employees/employees/edit-create-employee-modal";
import FiltersModal from "../../../components/employees/employees/filters-modal";
import EditCreateAreaModal from "../../../components/employees/areas/edit-create-area-modal";

interface IEmployees {}

const Employees: React.FC<IEmployees> = () => {
  const [employeesResult, setEmployeesResult] = useState<IEmployee[]>();
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [addAreaModalOpen, setAddAreaModalOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<IEmployeesFilters>({});

  useEffect(() => {
    getEmployees({})
      .then((res) => setEmployeesResult(res))
      .catch(() => errorToast());
  }, []);

  const refreshTable = () => {
    getEmployees({})
      .then((res) => setEmployeesResult(res))
      .catch(() => errorToast());
  };

  const filtersAppliedInfo = () => {
    const filtersApplied = Object.keys(filters).filter(
      (key) => key !== "sortBy"
    ).length;

    if (filtersApplied === 0) return;

    return (
      <div style={{ textAlign: "right" }}>{`${filtersApplied} filtro${
        filtersApplied > 1 ? "s" : ""
      } aplicado${filtersApplied > 1 ? "s" : ""}`}</div>
    );
  };

  return (
    <Fragment>
      <PageTitle>Funcionários</PageTitle>
      <ButtonsContainer>
        <AddNewButtons>
          <Button
            style={{ marginRight: SPACES.px4 }}
            onClick={() => setAddEmployeeModalOpen(true)}
          >
            Novo funcionário
          </Button>
          <EditCreateEmployeeModal
            isOpen={addEmployeeModalOpen}
            setIsOpen={setAddEmployeeModalOpen}
            creation
            refreshTable={refreshTable}
          />
          <Button style={{ marginRight: SPACES.px4 }} kind="text">
            Novo time
          </Button>
          <Button kind="text" onClick={() => setAddAreaModalOpen(true)}>
            Nova área
          </Button>
          <EditCreateAreaModal
            isOpen={addAreaModalOpen}
            setIsOpen={setAddAreaModalOpen}
            creation
            refreshTable={refreshTable}
          />
        </AddNewButtons>
        <div>
          <Button onClick={() => setFiltersModalOpen(true)}>Filtros</Button>
          <FiltersModal
            isOpen={filtersModalOpen}
            setIsOpen={setFiltersModalOpen}
            setEmployees={setEmployeesResult}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </ButtonsContainer>
      {filtersAppliedInfo()}
      {employeesResult ? (
        <EmployeesTable
          employees={employeesResult}
          refreshTable={refreshTable}
        />
      ) : (
        <LoadingBox />
      )}
    </Fragment>
  );
};

export default Employees;
