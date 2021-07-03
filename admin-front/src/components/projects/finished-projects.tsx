import React, { useEffect, useState, Fragment } from "react";
import { getProjects } from "../../requests/projects/get-projects";
import { IProject, IProjectsFilters } from "../../requests/projects/types";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";
import DataWithFilters from "../../ui-components/data-with-filters/data-with-filters";
import FiltersFormFields from "./filters-form-fields";
import ProjectsGrid from "./projects-grid";
import { errorToast } from "../../ui-components/toasts/toasts";
import LoadingBox from "../../ui-components/loading-box/loading-box";

interface IFinishedProjects {}

const FinishedProjects: React.FC<IFinishedProjects> = () => {
  const [projectsResult, setProjectsResult] = useState<IProject[]>();

  useEffect(() => {
    getAllData({ status: "FINISHED" });
  }, []);

  const refreshData = (filters?: IProjectsFilters): Promise<any> => {
    return getAllData({ ...filters, status: "FINISHED" });
  };

  const getAllData = (filters?: IProjectsFilters): Promise<any> => {
    return getProjects(filters)
      .then((res) => setProjectsResult(res))
      .catch(() => errorToast());
  };

  const container = projectsResult ? (
    <ProjectsGrid projects={projectsResult} refreshData={refreshData} />
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
      />
    </Fragment>
  );
};

export default FinishedProjects;
