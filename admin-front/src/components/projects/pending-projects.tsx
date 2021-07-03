import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getProjects } from "../../requests/projects/get-projects";
import { IProject, IProjectsFilters } from "../../requests/projects/types";
import DataWithFilters from "../../ui-components/data-with-filters/data-with-filters";
import { errorToast } from "../../ui-components/toasts/toasts";
import FiltersFormFields from "./filters-form-fields";
import {
  PendingProjectsStyled,
  ProjectsGridContainer,
  ProjectsExpectationsContainer,
  ExpectedValue,
} from "./pending-projects.style";
import LoadingBox from "../../ui-components/loading-box/loading-box";
import Button from "../../ui-components/button/button";
import EditCreateProjectModal from "./edit-create-project-modal";
import { getTotalIncomeExpected } from "../../requests/projects/get-total-income-expected";
import { getTotalCostExpected } from "../../requests/projects/get-total-cost-expected";
import ProjectsGrid from "./projects-grid";
import BaseCard from "../../ui-components/base-card/base-card";
import { SPACES } from "../../ui-constants/sizes";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";

interface IPendingProjects {}

const PendingProjects: React.FC<IPendingProjects> = () => {
  const [projectsResult, setProjectsResult] = useState<IProject[]>();
  const [incomeExpected, setIncomeExpected] = useState<number>();
  const [costExpected, setCostExpected] = useState<number>();
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);

  useEffect(() => {
    getAllData({ status: "PENDING" });
  }, []);

  const refreshData = (filters?: IProjectsFilters): Promise<any> => {
    return getAllData({ ...filters, status: "PENDING" });
  };

  const getAllData = (filters?: IProjectsFilters): Promise<any> => {
    getTotalIncomeExpected(filters)
      .then((res) => setIncomeExpected(res.totalExpectedIncome))
      .catch(() => errorToast());
    getTotalCostExpected(filters)
      .then((res) => setCostExpected(res.totalExpectedCost))
      .catch(() => errorToast());
    return getProjects(filters)
      .then((res) => setProjectsResult(res))
      .catch(() => errorToast());
  };

  const container = projectsResult ? (
    <PendingProjectsStyled>
      <ProjectsGridContainer>
        <ProjectsGrid
          projects={projectsResult}
          refreshData={refreshData}
          actions={["FINISHED", "CANCELED"]}
        />
      </ProjectsGridContainer>
      <ProjectsExpectationsContainer>
        <BaseCard
          title="Total de entradas esperadas"
          textAlign="center"
          style={{ marginBottom: SPACES.px10 }}
        >
          <ExpectedValue>{`R$ ${incomeExpected || "0,00"}`}</ExpectedValue>
        </BaseCard>
        <BaseCard title="Total de custos esperados" textAlign="center">
          <ExpectedValue>{`R$ ${costExpected || "0,00"}`}</ExpectedValue>
        </BaseCard>
      </ProjectsExpectationsContainer>
    </PendingProjectsStyled>
  ) : (
    <LoadingBox />
  );

  const handleConfirmForm = (values: IProjectsFilters): Promise<any> => {
    const cleanedFilters = cleanEmptyEntries(values, [""]);

    return refreshData(cleanedFilters).then(() => cleanedFilters);
  };

  return (
    <Fragment>
      <DataWithFilters
        dataContainer={container}
        filtersFormFields={<FiltersFormFields />}
        handleConfirmForm={handleConfirmForm}
        topRightInfo={
          <Fragment>
            <Button onClick={() => setAddProjectModalOpen(true)}>
              Novo projeto
            </Button>
            <EditCreateProjectModal
              isOpen={addProjectModalOpen}
              setIsOpen={setAddProjectModalOpen}
              creation
              refreshData={refreshData}
            />
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default PendingProjects;
