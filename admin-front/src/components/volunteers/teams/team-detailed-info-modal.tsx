import React from "react";
import { IVolunteerTeam } from "../../../requests/volunteers/types";
import Modal from "../../../ui-components/modal/modal";
import {
  VolunteerRow,
  Subtitle,
  DescriptionContainer,
  VolunteerCol,
} from "./team-detailed-info-modal.style";
import ShyEmptyState from "../../../ui-components/shy-empty-state/shy-empty-state";

interface ITeamDetailedInfoModal {
  team: IVolunteerTeam;
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
      <Subtitle>Voluntários</Subtitle>
      {team.volunteers.length > 0 ? (
        team.volunteers.map((v) => (
          <VolunteerRow key={`volunteer-row-${v.id}`}>
            <VolunteerCol>{v.name}</VolunteerCol>
            <VolunteerCol>{v.phone}</VolunteerCol>
          </VolunteerRow>
        ))
      ) : (
        <ShyEmptyState />
      )}
    </Modal>
  );
};

export default TeamDetailedInfoModal;
