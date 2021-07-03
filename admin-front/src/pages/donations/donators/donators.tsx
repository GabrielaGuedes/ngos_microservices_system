import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { getDonators } from "../../../requests/donations/get-donators";
import { IDonator, IDonatorsFilters } from "../../../requests/donations/types";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { PageTitle } from "../../../ui-components/typography/page-title";
import DonationsTable from "../../../components/donations/donators/donators-table";
import DataWithFilters from "../../../ui-components/data-with-filters/data-with-filters";
import FiltersFormFields from "../../../components/donations/donators/filters-form-fields";
import { cleanEmptyEntries } from "../../../utils/empty-entries-cleaner";

const Donators: React.FC = () => {
  const [donatorsResult, setDonatorsResult] = useState<IDonator[]>();

  useEffect(() => {
    getDonators({})
      .then((res) => setDonatorsResult(res))
      .catch(() => errorToast());
  }, []);

  const handleConfirmForm = (values: IDonatorsFilters): Promise<any> => {
    const cleanedFilters = cleanEmptyEntries(values, [""]);

    return getDonators(cleanedFilters)
      .then((res) => {
        setDonatorsResult(res);
        return cleanedFilters;
      })
      .catch(() => errorToast());
  };

  return (
    <Fragment>
      <PageTitle>Doadores</PageTitle>
      <DataWithFilters
        loading={!donatorsResult}
        handleConfirmForm={handleConfirmForm}
        filtersFormFields={<FiltersFormFields />}
      >
        {donatorsResult && <DonationsTable donators={donatorsResult} />}
      </DataWithFilters>
    </Fragment>
  );
};

export default Donators;
