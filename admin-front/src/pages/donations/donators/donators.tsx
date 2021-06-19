import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { getDonators } from "../../../requests/donations/get-donators";
import { IDonator, IDonatorsFilters } from "../../../requests/donations/types";
import { Button } from "../../../ui-components/buttons/buttons";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { PageTitle } from "../../../ui-components/typography/page-title";
import { FilterButtonContainer } from "./donators.style";
import FiltersModal from "../../../components/donations/donators/filters-modal/filters-modal";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import DonationsTable from "../../../components/donations/donators/donators-table/donators-table";

const Donators: React.FC = () => {
  const [donatorsResult, setDonatorsResult] = useState<IDonator[]>();
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<IDonatorsFilters>({});

  useEffect(() => {
    getDonators({})
      .then((res) => setDonatorsResult(res))
      .catch(() => errorToast());
  }, []);

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
      {donatorsResult ? (
        <DonationsTable donators={donatorsResult} />
      ) : (
        <LoadingBox />
      )}
    </Fragment>
  );
};

export default Donators;
