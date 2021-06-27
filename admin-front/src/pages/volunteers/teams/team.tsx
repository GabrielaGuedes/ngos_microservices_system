import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { getTeams } from "../../../requests/volunteers/get-teams";
import { IVolunteerTeam } from "../../../requests/volunteers/types";
import Button from "../../../ui-components/button/button";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { PageTitle } from "../../../ui-components/typography/page-title";
import EditCreateTeamModal from "../../../components/volunteers/teams/edit-create-team-modal";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import { TeamsGrid } from "./team.style";
import TeamCard from "../../../components/volunteers/teams/team-card";
import EmptyState from "../../../ui-components/empty-state/empty-state";

interface ITeam {}

const Team: React.FC<ITeam> = () => {
  const [teamsResult, setTeamsResult] = useState<IVolunteerTeam[]>();
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);

  useEffect(() => {
    getTeams({})
      .then((res) => setTeamsResult(res))
      .catch(() => errorToast());
  }, []);

  const refreshData = () => {
    getTeams({})
      .then((res) => setTeamsResult(res))
      .catch(() => errorToast());
  };

  return (
    <Fragment>
      <PageTitle>Times</PageTitle>
      <Button onClick={() => setAddTeamModalOpen(true)}>Novo time</Button>
      <EditCreateTeamModal
        isOpen={addTeamModalOpen}
        setIsOpen={setAddTeamModalOpen}
        creation
        refreshTable={refreshData}
      />
      {teamsResult ? (
        <TeamsGrid>
          {teamsResult.length > 0 ? (
            teamsResult.map((a) => (
              <TeamCard
                key={`card-${a.id}-${a.name}`}
                team={a}
                refreshData={refreshData}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </TeamsGrid>
      ) : (
        <LoadingBox />
      )}
    </Fragment>
  );
};

export default Team;
