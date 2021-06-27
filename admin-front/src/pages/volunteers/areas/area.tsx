import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { getAreas } from "../../../requests/volunteers/get-areas";
import { IVolunteerArea } from "../../../requests/volunteers/types";
import Button from "../../../ui-components/button/button";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { PageTitle } from "../../../ui-components/typography/page-title";
import EditCreateAreaModal from "../../../components/volunteers/areas/edit-create-area-modal";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import { Grid } from "../../../ui-components/grid/grid.style";
import AreaCard from "../../../components/volunteers/areas/area-card";
import EmptyState from "../../../ui-components/empty-state/empty-state";

interface IArea {}

const Area: React.FC<IArea> = () => {
  const [areasResult, setAreasResult] = useState<IVolunteerArea[]>();
  const [addAreaModalOpen, setAddAreaModalOpen] = useState(false);

  useEffect(() => {
    getAreas({})
      .then((res) => setAreasResult(res))
      .catch(() => errorToast());
  }, []);

  const refreshData = () => {
    getAreas({})
      .then((res) => setAreasResult(res))
      .catch(() => errorToast());
  };

  return (
    <Fragment>
      <PageTitle>Áreas</PageTitle>
      <Button onClick={() => setAddAreaModalOpen(true)}>Nova área</Button>
      <EditCreateAreaModal
        isOpen={addAreaModalOpen}
        setIsOpen={setAddAreaModalOpen}
        creation
        refreshTable={refreshData}
      />
      {areasResult ? (
        <Grid>
          {areasResult.length > 0 ? (
            areasResult.map((a) => (
              <AreaCard
                key={`card-${a.id}-${a.name}`}
                area={a}
                refreshData={refreshData}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </Grid>
      ) : (
        <LoadingBox />
      )}
    </Fragment>
  );
};

export default Area;
