import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { getEmployees } from "../../../requests/employees/get-employees";
import { IEmployee } from "../../../requests/employees/types";
import Button from "../../../ui-components/buttons/button";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { PageTitle } from "../../../ui-components/typography/page-title";
import { SPACES } from "../../../ui-constants/sizes";
import { ButtonsContainer, AddNewButtons } from "./employee.style";
import EmployeesTable from "../../../components/employees/employees/employees-table";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import EditCreateEmployeeModal from "../../../components/employees/employees/edit-create-employee-modal";

interface IEmployees {}

const Employees: React.FC<IEmployees> = () => {
  const [employeesResult, setEmployeesResult] = useState<IEmployee[]>();
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);

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
          <Button kind="text">Nova área</Button>
        </AddNewButtons>
        <Button>Filtros</Button>
      </ButtonsContainer>
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
