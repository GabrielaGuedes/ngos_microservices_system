import React, { useState } from "react";
import { IProject, ProjectStatus } from "../../requests/projects/types";
import Button from "../../ui-components/button/button";
import GridCard from "../../ui-components/grid-card/grid-card";
import {
  StartDateContainer,
  BottomButtonsContainer,
  IconsContainer,
} from "./project-card.style";
import EditProjectButton from "./edit-project-button";
import DeleteProjectButton from "./delete-project-button";
import ProjectDetailedInfoModal from "./project-detailed-info-modal";
import MoreOptions from "../../ui-components/more-options/more-options";
import { updateProject } from "../../requests/projects/update-project";
import { errorToast } from "../../ui-components/toasts/toasts";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";

const ACTIONS_LABEL = {
  CANCELED: "Cancelar projeto",
  FINISHED: "Finalizar projeto",
  PENDING: "Marcar como pendente",
};

interface IProjectCard {
  project: IProject;
  refreshData: () => Promise<any>;
  actions: ProjectStatus[];
}

const ProjectCard: React.FC<IProjectCard> = ({
  project,
  refreshData,
  actions,
}) => {
  const [detailedModalOpen, setDetailedModalOpen] = useState(false);

  const items = () => {
    return actions.map((a) => ({
      label: ACTIONS_LABEL[a],
      onClick: () => {
        const projectUpdated = { ...project, status: a } as any;
        delete projectUpdated.id;
        delete projectUpdated.updatedAt;
        delete projectUpdated.createdAt;
        updateProject(cleanEmptyEntries(projectUpdated) as any, project.id)
          .then(() => refreshData())
          .catch(() => errorToast());
      },
    }));
  };

  return (
    <GridCard
      title={project.name}
      topRightElement={<MoreOptions items={items()} />}
    >
      {project.description}
      <StartDateContainer>
        <b>Início: </b>
        {new Date(project.startDate).toLocaleDateString()}
      </StartDateContainer>
      <BottomButtonsContainer>
        <IconsContainer>
          <EditProjectButton project={project} refreshData={refreshData} />
          <DeleteProjectButton
            key={`delete-${project.id}-${project.name}`}
            id={project.id}
            name={project.name}
            refreshData={refreshData}
          />
        </IconsContainer>
        <div>
          <Button kind="text" onClick={() => setDetailedModalOpen(true)}>
            Ver mais
          </Button>
          <ProjectDetailedInfoModal
            key={`info-${project.id}-${project.name}`}
            isOpen={detailedModalOpen}
            setIsOpen={setDetailedModalOpen}
            project={project}
          />
        </div>
      </BottomButtonsContainer>
    </GridCard>
  );
};

export default ProjectCard;
