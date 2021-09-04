import { Tab, Tabs } from "grommet";
import React, { useEffect, useState } from "react";
import Donations from "../components/donations/donations";
import Reports from "../components/reports/reports";
import { getDetails } from "../requests/settings/get-details-config";
import { getServices } from "../requests/settings/get-services-config";
import { IServicesConfig } from "../requests/settings/types";
import { errorToast } from "../ui-components/toasts/toasts";
import { PageTitle } from "../ui-components/typography/page-title";
import { LogoContainer, PageContainer } from "./initial.style";
import logo from "../assets/images/logo.png";
import WhyDonate from "../components/why-donate/why-donate";

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
      <LogoContainer>
        <img src={logo} alt="logo" />
      </LogoContainer>
      <PageTitle>{name}</PageTitle>
      <Tabs alignControls="center">
        {services?.donations && (
          <Tab title="Por que doar?">
            <WhyDonate />
          </Tab>
        )}
        {services?.donations && (
          <Tab title="Doações">
            <Donations />
          </Tab>
        )}
        {services?.reports && (
          <Tab title="Transparência">
            <Reports />
          </Tab>
        )}
      </Tabs>
    </PageContainer>
  );
};

export default Initial;
