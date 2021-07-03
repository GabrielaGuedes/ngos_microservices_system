import React, { useEffect, useState } from "react";
import { getProjects } from "../../requests/projects/get-projects";
import { IProject, IProjectsFilters } from "../../requests/projects/types";
import { errorToast } from "../../ui-components/toasts/toasts";
import ProjectsGrid from "./projects-grid";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";
import { Fragment } from "react";
import DataWithFilters from "../../ui-components/data-with-filters/data-with-filters";
import FiltersFormFields from "./filters-form-fields";

interface ICanceledProjects {}

const CanceledProjects: React.FC<ICanceledProjects> = () => {
  const [projectsResult, setProjectsResult] = useState<IProject[]>();

  useEffect(() => {
    getAllData({ status: "CANCELED" });
  }, []);

  const refreshData = (filters?: IProjectsFilters): Promise<any> => {
    return getAllData({ ...filters, status: "CANCELED" });
  };

  const getAllData = (filters?: IProjectsFilters): Promise<any> => {
    return getProjects(filters)
      .then((res) => setProjectsResult(res))
      .catch(() => errorToast());
  };

  const handleConfirmForm = (values: IProjectsFilters): Promise<any> => {
    const cleanedFilters = cleanEmptyEntries(values, [""]);

    return refreshData(cleanedFilters).then(() => cleanedFilters);
  };

  return (
    <Fragment>
      <DataWithFilters
        filtersFormFields={<FiltersFormFields />}
        handleConfirmForm={handleConfirmForm}
        loading={!projectsResult}
      >
        {projectsResult && (
          <ProjectsGrid
            projects={projectsResult}
            refreshData={refreshData}
            actions={["FINISHED", "PENDING"]}
          />
        )}
      </DataWithFilters>
    </Fragment>
  );
};

export default CanceledProjects;
