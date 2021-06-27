import React, { Fragment } from "react";
import { Tab, Tabs } from "grommet";
import { TabContentContainer } from "../../ui-components/base-containers/base-containers";
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
          <TabContentContainer>
            <ServicesCard />
            <GeneralSettingsCard />
          </TabContentContainer>
        </Tab>
        <Tab title="Usuários">
          <TabContentContainer>
            <AddUserCard />
          </TabContentContainer>
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export default Settings;
