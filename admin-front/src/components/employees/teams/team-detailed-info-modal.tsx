import React from "react";
import { IEmployeeTeam } from "../../../requests/employees/types";
import Modal from "../../../ui-components/modal/modal";
import {
  EmployeeRow,
  Subtitle,
  DescriptionContainer,
} from "./team-detailed-info-modal.style";
import ShyEmptyState from "../../../ui-components/shy-empty-state/shy-empty-state";

interface ITeamDetailedInfoModal {
  team: IEmployeeTeam;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const TeamDetailedInfoModal: React.FC<ITeamDetailedInfoModal> = ({
  team,
  isOpen,
  setIsOpen,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={team.name}>
      <DescriptionContainer>
        <Subtitle>Descrição</Subtitle>
        {team.description || <ShyEmptyState />}
      </DescriptionContainer>
      <Subtitle>Funcionários</Subtitle>
      {team.employees.length > 0 ? (
        team.employees.map((e) => (
          <EmployeeRow key={`employee-row-${team.id}-${team.name}`}>
            <div>{e.name}</div>
            <div>{e.occupation}</div>
          </EmployeeRow>
        ))
      ) : (
        <ShyEmptyState />
      )}
    </Modal>
  );
};

export default TeamDetailedInfoModal;
