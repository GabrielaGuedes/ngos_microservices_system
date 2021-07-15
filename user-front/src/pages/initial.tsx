import { Tab, Tabs } from "grommet";
import React, { useEffect, useState } from "react";
import { getDetails } from "../requests/settings/get-details-config";
import { getServices } from "../requests/settings/get-services-config";
import { IServicesConfig } from "../requests/settings/types";
import { errorToast } from "../ui-components/toasts/toasts";
import { PageTitle } from "../ui-components/typography/page-title";
import { PageContainer } from "./initial.style";

interface IInitial {}

const Initial: React.FC<IInitial> = () => {
  const [name, setName] = useState<string>();
  const [services, setServices] = useState<IServicesConfig>();

  useEffect(() => {
    getDetails()
      .then((result) => setName(result.name))
      .catch(() => errorToast());
    getServices()
      .then((result) => setServices(result))
      .catch(() => errorToast());
  }, []);

  return (
    <PageContainer>
      <PageTitle>{name}</PageTitle>
      <Tabs alignControls="center">
        {services?.donations && <Tab title="Doações">a</Tab>}
        {services?.reports && <Tab title="Transparência">a</Tab>}
      </Tabs>
    </PageContainer>
  );
};

export default Initial;
