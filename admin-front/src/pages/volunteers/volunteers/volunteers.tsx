import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { getVolunteers } from "../../../requests/volunteers/get-volunteers";
import { IVolunteer } from "../../../requests/volunteers/types";
import Button from "../../../ui-components/button/button";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { PageTitle } from "../../../ui-components/typography/page-title";
import { SPACES } from "../../../ui-constants/sizes";
import { AddNewButtons } from "./volunteers.style";
import VolunteersTable from "../../../components/volunteers/volunteers/volunteers-table";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import EditCreateVolunteerModal from "../../../components/volunteers/volunteers/edit-create-volunteer-modal";
import EditCreateAreaModal from "../../../components/volunteers/areas/edit-create-area-modal";
import EditCreateTeamModal from "../../../components/volunteers/teams/edit-create-team-modal";
import { isMobile } from "../../../utils/is-mobile";
import DataWithFilters from "../../../ui-components/data-with-filters/data-with-filters";
import FiltersFormFields, {
  IVolunteersFiltersForm,
} from "../../../components/volunteers/volunteers/filters-form-fields";
import { cleanEmptyEntries } from "../../../utils/empty-entries-cleaner";

interface IVolunteers {}

const Volunteers: React.FC<IVolunteers> = () => {
  const [volunteersResult, setVolunteersResult] = useState<IVolunteer[]>();
  const [addVolunteerModalOpen, setAddVolunteerModalOpen] = useState(false);
  const [addAreaModalOpen, setAddAreaModalOpen] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);

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

  const addNewButtons = (
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
  );

  const formatFormValues = (values: IVolunteersFiltersForm) => {
    const formatted = {
      ...values,
      teamId: values.team?.value,
      areaId: values.area?.value,
    };
    delete formatted.area;
    delete formatted.team;
    return formatted;
  };

  const handleConfirmForm = (values: IVolunteersFiltersForm): Promise<any> => {
    const formattedValues = formatFormValues(values);
    const cleanedFilters = cleanEmptyEntries(formattedValues, ["", undefined]);

    return getVolunteers(cleanedFilters)
      .then((res) => {
        setVolunteersResult(res);
        return cleanedFilters;
      })
      .catch(() => errorToast());
  };

  return (
    <Fragment>
      <PageTitle>Voluntários</PageTitle>
      <DataWithFilters
        dataContainer={
          volunteersResult ? (
            <VolunteersTable
              volunteers={volunteersResult}
              refreshTable={refreshTable}
            />
          ) : (
            <LoadingBox />
          )
        }
        filtersFormFields={<FiltersFormFields />}
        handleConfirmForm={handleConfirmForm}
        topRightInfo={addNewButtons}
      />
    </Fragment>
  );
};

export default Volunteers;
