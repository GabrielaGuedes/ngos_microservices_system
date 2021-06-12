import React, { Fragment } from "react";
import { Tab, Tabs } from "grommet";
import { ContentContainer } from "./settings.style";
import { PageTitle } from "../../ui-components/typography/page-title";
import ServicesCard from "../../components/settings/services-settings/services-card";
import GeneralSettingsCard from "../../components/settings/general-settings/general-settings-card";
import AddUserCard from "../../components/settings/users/add-user-card";

interface ISettings {}

const Settings: React.FC<ISettings> = () => {
  return (
    <Fragment>
      <PageTitle>Configurações</PageTitle>
      <Tabs alignControls="start">
        <Tab title="Configurações">
          <ContentContainer>
            <ServicesCard />
            <GeneralSettingsCard />
          </ContentContainer>
        </Tab>
        <Tab title="Usuários">
          <ContentContainer>
            <AddUserCard />
          </ContentContainer>
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export default Settings;
