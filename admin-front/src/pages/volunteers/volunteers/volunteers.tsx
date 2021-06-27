import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { getVolunteers } from "../../../requests/volunteers/get-volunteers";
import {
  IVolunteer,
  IVolunteersFilters,
} from "../../../requests/volunteers/types";
import Button from "../../../ui-components/button/button";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { PageTitle } from "../../../ui-components/typography/page-title";
import { SPACES } from "../../../ui-constants/sizes";
import { ButtonsContainer, AddNewButtons } from "./volunteers.style";
import VolunteersTable from "../../../components/volunteers/volunteers/volunteers-table";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import EditCreateVolunteerModal from "../../../components/volunteers/volunteers/edit-create-volunteer-modal";
import FiltersModal from "../../../components/volunteers/volunteers/filters-modal";
import EditCreateAreaModal from "../../../components/volunteers/areas/edit-create-area-modal";
import EditCreateTeamModal from "../../../components/volunteers/teams/edit-create-team-modal";
import { isMobile } from "../../../utils/is-mobile";

interface IVolunteers {}

const Volunteers: React.FC<IVolunteers> = () => {
  const [volunteersResult, setVolunteersResult] = useState<IVolunteer[]>();
  const [addVolunteerModalOpen, setAddVolunteerModalOpen] = useState(false);
  const [addAreaModalOpen, setAddAreaModalOpen] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<IVolunteersFilters>({});

  useEffect(() => {
    getVolunteers({})
      .then((res) => setVolunteersResult(res))
      .catch(() => errorToast());
  }, []);

  const refreshTable = () => {
    getVolunteers({})
      .then((res) => setVolunteersResult(res))
      .catch(() => errorToast());
  };

  const filtersAppliedInfo = () => {
    const filtersApplied = Object.keys(filters).filter(
      (key) => key !== "sortBy"
    ).length;

    if (filtersApplied === 0) return;

    return (
      <div style={{ textAlign: "right" }}>{`${filtersApplied} filtro${
        filtersApplied > 1 ? "s" : ""
      } aplicado${filtersApplied > 1 ? "s" : ""}`}</div>
    );
  };

  return (
    <Fragment>
      <PageTitle>Voluntários</PageTitle>
      <ButtonsContainer>
        <AddNewButtons>
          <Button
            style={{ marginRight: SPACES.px4 }}
            onClick={() => setAddVolunteerModalOpen(true)}
          >
            Novo voluntário
          </Button>
          <EditCreateVolunteerModal
            isOpen={addVolunteerModalOpen}
            setIsOpen={setAddVolunteerModalOpen}
            creation
            refreshTable={refreshTable}
          />
          <Button
            style={{ marginRight: isMobile() || SPACES.px4 }}
            kind="text"
            onClick={() => setAddTeamModalOpen(true)}
          >
            Novo time
          </Button>
          <EditCreateTeamModal
            isOpen={addTeamModalOpen}
            setIsOpen={setAddTeamModalOpen}
            creation
            refreshTable={refreshTable}
          />
          <Button kind="text" onClick={() => setAddAreaModalOpen(true)}>
            Nova área
          </Button>
          <EditCreateAreaModal
            isOpen={addAreaModalOpen}
            setIsOpen={setAddAreaModalOpen}
            creation
            refreshTable={refreshTable}
          />
        </AddNewButtons>
        <div>
          <Button onClick={() => setFiltersModalOpen(true)}>Filtros</Button>
          <FiltersModal
            isOpen={filtersModalOpen}
            setIsOpen={setFiltersModalOpen}
            setVolunteers={setVolunteersResult}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </ButtonsContainer>
      {filtersAppliedInfo()}
      {volunteersResult ? (
        <VolunteersTable
          volunteers={volunteersResult}
          refreshTable={refreshTable}
        />
      ) : (
        <LoadingBox />
      )}
    </Fragment>
  );
};

export default Volunteers;
