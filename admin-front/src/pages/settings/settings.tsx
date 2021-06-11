import React, { Fragment } from "react";
import { Box, Tab, Tabs } from "grommet";
import { ContentContainer } from "./settings.style";
import { PageTitle } from "../../ui-components/typography/page-title";
import ServicesCard from "../../components/settings/general-settings/services-card";

interface ISettings {}

const Settings: React.FC<ISettings> = () => {
  return (
    <Fragment>
      <PageTitle>Configurações</PageTitle>
      <Tabs alignControls="start">
        <Tab title="Configurações">
          <ContentContainer>
            <ServicesCard />
          </ContentContainer>
        </Tab>
        <Tab title="Usuários">
          <ContentContainer>
            <Box pad="medium">Two</Box>
          </ContentContainer>
          s
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export default Settings;
