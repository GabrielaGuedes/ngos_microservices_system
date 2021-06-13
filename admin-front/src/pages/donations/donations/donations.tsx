import React, { useEffect, Fragment } from "react";
import { useState } from "react";
import { getDonations } from "../../../requests/donations/get-donations";
import { PageTitle } from "../../../ui-components/typography/page-title";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import { errorToast } from "../../../ui-components/toasts/toasts";
import DonationsTable from "../../../components/donations/donations-table/donations-table";
import { Button } from "../../../ui-components/buttons/buttons";
import { InfosContainer } from "./donations.style";
import { IDonations } from "../../../requests/donations/types";

const Donations: React.FC = () => {
  const [donationsResult, setDonationsResult] = useState<IDonations>();

  useEffect(() => {
    getDonations({ minValue: "50.02" })
      .then((res) => setDonationsResult(res))
      .catch(() => errorToast());
  }, []);

  return (
    <Fragment>
      <PageTitle>Doações feitas</PageTitle>
      <InfosContainer>
        <div>
          Total dodado: R$ {donationsResult?.total.toString().replace(".", ",")}
        </div>
        <Button>Filtros</Button>
      </InfosContainer>
      {donationsResult ? (
        <DonationsTable donations={donationsResult.donations} />
      ) : (
        <LoadingBox />
      )}
    </Fragment>
  );
};

export default Donations;
