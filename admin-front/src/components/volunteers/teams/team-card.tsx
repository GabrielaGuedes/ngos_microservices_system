import React from "react";
import { IVolunteerTeam } from "../../../requests/volunteers/types";
import Button from "../../../ui-components/button/button";
import { IconsContainer, BottomButtonsContainer } from "./team-card.style";
import GridCard from "../../../ui-components/grid-card/grid-card";
import { useState } from "react";
import TeamDetailedInfoModal from "./team-detailed-info-modal";
import EditTeamButton from "./edit-team-button";
import DeleteTeamButton from "./delete-team-button";

interface ITeamCard {
  team: IVolunteerTeam;
  refreshData: () => void;
}

const TeamCard: React.FC<ITeamCard> = ({ team, refreshData }) => {
  const [detailedModalOpen, setDetailedModalOpen] = useState(false);

  return (
    <GridCard title={team.name}>
      {team.description}
      <BottomButtonsContainer>
        <IconsContainer>
          <EditTeamButton team={team} refreshData={refreshData} />
          <DeleteTeamButton
            key={`delete-${team.id}-${team.name}`}
            id={team.id}
            name={team.name}
            refreshData={refreshData}
          />
        </IconsContainer>
        <div>
          <Button kind="text" onClick={() => setDetailedModalOpen(true)}>
            Ver mais
          </Button>
          <TeamDetailedInfoModal
            key={`info-${team.id}-${team.name}`}
            isOpen={detailedModalOpen}
            setIsOpen={setDetailedModalOpen}
            team={team}
          />
        </div>
      </BottomButtonsContainer>
    </GridCard>
  );
};

export default TeamCard;
