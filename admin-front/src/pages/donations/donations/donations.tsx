import React, { useEffect, Fragment } from "react";
import { useState } from "react";
import { getDonations } from "../../../requests/donations/get-donations";
import { PageTitle } from "../../../ui-components/typography/page-title";
import LoadingBox from "../../../ui-components/loading-box/loading-box";
import { errorToast } from "../../../ui-components/toasts/toasts";
import DonationsTable from "../../../components/donations/donations-table/donations-table";
import { Button } from "../../../ui-components/buttons/buttons";
import { InfosContainer, TotalDonated } from "./donations.style";
import { IDonations } from "../../../requests/donations/types";
import Modal from "../../../ui-components/modal/modal";

const Donations: React.FC = () => {
  const [donationsResult, setDonationsResult] = useState<IDonations>();
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

  useEffect(() => {
    getDonations({ minValue: "50.02" })
      .then((res) => setDonationsResult(res))
      .catch(() => errorToast());
  }, []);

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
          <Modal
            isOpen={filtersModalOpen}
            setIsOpen={setFiltersModalOpen}
            title="Filtros"
            confirmLabel="Aplicar"
            footer
          >
            asdasd
          </Modal>
        </div>
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
