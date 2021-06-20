import React, { useEffect, Fragment } from "react";
import { useState } from "react";
import { getDonations } from "../../../requests/donations/get-donations";
import { PageTitle } from "../../../ui-components/typography/page-title";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import { errorToast } from "../../../ui-components/toasts/toasts";
import Button from "../../../ui-components/buttons/button";
import { InfosContainer, TotalDonated } from "./donations.style";
import {
  IDonations,
  IDonationsFilters,
} from "../../../requests/donations/types";
import FiltersModal from "../../../components/donations/donations/filters-modal";
import DonationsTable from "../../../components/donations/donations/donations-table";

const Donations: React.FC = () => {
  const [donationsResult, setDonationsResult] = useState<IDonations>();
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<IDonationsFilters>({});

  useEffect(() => {
    getDonations({})
      .then((res) => setDonationsResult(res))
      .catch(() => errorToast());
  }, []);

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
      <PageTitle>Doações feitas</PageTitle>
      <InfosContainer>
        <TotalDonated>
          Total dodado:{" "}
          <b>R$ {donationsResult?.total.toString().replace(".", ",")}</b>
        </TotalDonated>
        <div>
          <Button onClick={() => setFiltersModalOpen(true)}>Filtros</Button>
          <FiltersModal
            isOpen={filtersModalOpen}
            setIsOpen={setFiltersModalOpen}
            setDonations={setDonationsResult}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </InfosContainer>
      {filtersAppliedInfo()}
      {donationsResult ? (
        <DonationsTable donations={donationsResult.donations} />
      ) : (
        <LoadingBox />
      )}
    </Fragment>
  );
};

export default Donations;
