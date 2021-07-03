import React from "react";
import Modal from "../../ui-components/modal/modal";
import {
  Subtitle,
  RowContainer,
  DateContainer,
  ExpectedValue,
} from "./project-detailed-info-modal.style";
import ShyEmptyState from "../../ui-components/shy-empty-state/shy-empty-state";
import { IProject } from "../../requests/projects/types";
import {
  TupleFieldContainer,
  HalfFieldContainer,
} from "../../ui-components/base-containers/base-containers";
import { COLORS } from "../../ui-constants/colors";

interface IProjectDetailedInfoModal {
  project: IProject;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ProjectDetailedInfoModal: React.FC<IProjectDetailedInfoModal> = ({
  project,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={project.name}>
      <RowContainer>
        <TupleFieldContainer>
          <HalfFieldContainer>
            <Subtitle>Descrição</Subtitle>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <DateContainer>
              {new Date(project.startDate).toLocaleDateString()} -{" "}
              {project.endDate &&
                new Date(project.endDate).toLocaleDateString()}
            </DateContainer>
          </HalfFieldContainer>
        </TupleFieldContainer>
        {project.description || <ShyEmptyState />}
      </RowContainer>
      <RowContainer>
        <Subtitle>Público alvo</Subtitle>
        {project.target || <ShyEmptyState />}
      </RowContainer>
      <RowContainer>
        <Subtitle>Entradas e saídas previstas</Subtitle>
        {project.expectedCost || project.expectedIncome ? (
          <TupleFieldContainer>
            <HalfFieldContainer>
              <ExpectedValue color={COLORS.main}>
                + R$ {project.expectedIncome || "-"}
              </ExpectedValue>
              {project.incomeDate
                ? `na data ${new Date(project.incomeDate).toLocaleDateString()}`
                : "sem data prevista"}
            </HalfFieldContainer>
            <HalfFieldContainer>
              <ExpectedValue color={COLORS.error}>
                - R$ {project.expectedCost || "-"}
              </ExpectedValue>
              {project.costDate
                ? `na data ${new Date(project.costDate).toLocaleDateString()}`
                : "sem data prevista"}
            </HalfFieldContainer>
          </TupleFieldContainer>
        ) : (
          <ShyEmptyState />
        )}
      </RowContainer>
      <RowContainer>
        <TupleFieldContainer>
          <HalfFieldContainer>
            <Subtitle>Área responsável</Subtitle>
            {project.responsibleArea || <ShyEmptyState />}
          </HalfFieldContainer>
          <HalfFieldContainer>
            <Subtitle>Time responsável</Subtitle>
            {project.responsibleTeam || <ShyEmptyState />}
          </HalfFieldContainer>
        </TupleFieldContainer>
      </RowContainer>
    </Modal>
  );
};

export default ProjectDetailedInfoModal;
