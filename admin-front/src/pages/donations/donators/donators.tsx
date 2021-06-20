import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { getDonators } from "../../../requests/donations/get-donators";
import { IDonator, IDonatorsFilters } from "../../../requests/donations/types";
import Button from "../../../ui-components/buttons/button";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { PageTitle } from "../../../ui-components/typography/page-title";
import { FilterButtonContainer } from "./donators.style";
import FiltersModal from "../../../components/donations/donators/filters-modal";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import DonationsTable from "../../../components/donations/donators/donators-table";

const Donators: React.FC = () => {
  const [donatorsResult, setDonatorsResult] = useState<IDonator[]>();
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<IDonatorsFilters>({});

  useEffect(() => {
    getDonators({})
      .then((res) => setDonatorsResult(res))
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
      <PageTitle>Doadores</PageTitle>
      <FilterButtonContainer>
        <Button onClick={() => setFiltersModalOpen(true)}>Filtros</Button>
        <FiltersModal
          isOpen={filtersModalOpen}
          setIsOpen={setFiltersModalOpen}
          setDonators={setDonatorsResult}
          filters={filters}
          setFilters={setFilters}
        />
      </FilterButtonContainer>
      {filtersAppliedInfo()}
      {donatorsResult ? (
        <DonationsTable donators={donatorsResult} />
      ) : (
        <LoadingBox />
      )}
    </Fragment>
  );
};

export default Donators;
