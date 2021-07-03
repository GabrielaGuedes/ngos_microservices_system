import React from "react";
import { IProject, ProjectStatus } from "../../requests/projects/types";
import { Grid } from "../../ui-components/grid/grid.style";
import EmptyState from "../../ui-components/empty-state/empty-state";
import ProjectCard from "./project-card";

interface IProjectsGrid {
  projects: IProject[] | null;
  refreshData: () => Promise<any>;
  actions: ProjectStatus[];
}

const ProjectsGrid: React.FC<IProjectsGrid> = ({
  projects,
  refreshData,
  actions,
}) => {
  return (
    <Grid>
      {projects && projects.length > 0 ? (
        projects.map((p) => (
          <ProjectCard
            key={`card-${p.id}-${p.name}`}
            project={p}
            refreshData={refreshData}
            actions={actions}
          />
        ))
      ) : (
        <EmptyState />
      )}
    </Grid>
  );
};

export default ProjectsGrid;
