import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { getEmployees } from "../../../requests/employees/get-employees";
import { IEmployee } from "../../../requests/employees/types";
import Button from "../../../ui-components/button/button";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { PageTitle } from "../../../ui-components/typography/page-title";
import { SPACES } from "../../../ui-constants/sizes";
import { AddNewButtons } from "./employee.style";
import EmployeesTable from "../../../components/employees/employees/employees-table";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import EditCreateEmployeeModal from "../../../components/employees/employees/edit-create-employee-modal";
import EditCreateAreaModal from "../../../components/employees/areas/edit-create-area-modal";
import EditCreateTeamModal from "../../../components/employees/teams/edit-create-team-modal";
import { isMobile } from "../../../utils/is-mobile";
import DataWithFilters from "../../../ui-components/data-with-filters/data-with-filters";
import FiltersFormFields, {
  IEmployeesFiltersForm,
} from "../../../components/employees/employees/filters-form-fields";
import { cleanEmptyEntries } from "../../../utils/empty-entries-cleaner";

interface IEmployees {}

const Employees: React.FC<IEmployees> = () => {
  const [employeesResult, setEmployeesResult] = useState<IEmployee[]>();
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [addAreaModalOpen, setAddAreaModalOpen] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);

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

  const addNewButtons = (
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
      <Button
        style={{ marginRight: isMobile() || SPACES.px4 }}
        kind="text"
        onClick={() => setAddTeamModalOpen(true)}
      >
        Novo time
      </Button>
      <EditCreateTeamModal
        isOpen={addTeamModalOpen}
        setIsOpen={setAddTeamModalOpen}
        creation
        refreshTable={refreshTable}
      />
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
  );

  const formatFormValues = (values: IEmployeesFiltersForm) => {
    const formatted = {
      ...values,
      teamId: values.team?.value,
      areaId: values.area?.value,
    };
    delete formatted.area;
    delete formatted.team;
    return formatted;
  };

  const handleConfirmForm = (values: IEmployeesFiltersForm): Promise<any> => {
    const formattedValues = formatFormValues(values);
    const cleanedFilters = cleanEmptyEntries(formattedValues, ["", undefined]);

    return getEmployees(cleanedFilters)
      .then((res) => {
        setEmployeesResult(res);
        return cleanedFilters;
      })
      .catch(() => errorToast());
  };

  return (
    <Fragment>
      <PageTitle>Funcionários</PageTitle>
      <DataWithFilters
        dataContainer={
          employeesResult ? (
            <EmployeesTable
              employees={employeesResult}
              refreshTable={refreshTable}
            />
          ) : (
            <LoadingBox />
          )
        }
        filtersFormFields={<FiltersFormFields />}
        topRightInfo={addNewButtons}
        handleConfirmForm={handleConfirmForm}
      />
    </Fragment>
  );
};

export default Employees;
