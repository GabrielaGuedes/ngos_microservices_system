import React, { useEffect, Fragment } from "react";
import { useState } from "react";
import { getDonations } from "../../../requests/donations/get-donations";
import { PageTitle } from "../../../ui-components/typography/page-title";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { TotalDonated } from "./donations.style";
import {
  IDonations,
  IDonationsFilters,
} from "../../../requests/donations/types";
import DonationsTable from "../../../components/donations/donations/donations-table";
import DataWithFilters from "../../../ui-components/data-with-filters/data-with-filters";
import FiltersFormFields from "../../../components/donations/donations/filters-form-fields";
import { cleanEmptyEntries } from "../../../utils/empty-entries-cleaner";

const Donations: React.FC = () => {
  const [donationsResult, setDonationsResult] = useState<IDonations>();

  useEffect(() => {
    getDonations({})
      .then((res) => setDonationsResult(res))
      .catch(() => errorToast());
  }, []);

  const handleConfirmForm = (value: IDonationsFilters): Promise<any> => {
    const cleanedFilters = cleanEmptyEntries(value, [false, ""]);

    return getDonations(cleanedFilters)
      .then((res) => {
        setDonationsResult(res);
        return cleanedFilters;
      })
      .catch(() => errorToast());
  };

  return (
    <Fragment>
      <PageTitle>Doações feitas</PageTitle>
      <DataWithFilters
        dataContainer={
          donationsResult ? (
            <DonationsTable donations={donationsResult.donations} />
          ) : (
            <LoadingBox />
          )
        }
        topRightInfo={
          <TotalDonated>
            Total dodado:{" "}
            <b>R$ {donationsResult?.total.toString().replace(".", ",")}</b>
          </TotalDonated>
        }
        filtersFormFields={<FiltersFormFields />}
        handleConfirmForm={handleConfirmForm}
      />
    </Fragment>
  );
};

export default Donations;
