import React from "react";
import { Fragment } from "react";
import { PageTitle } from "../../ui-components/typography/page-title";
import { Tab, Tabs } from "grommet";
import { TabContentContainer } from "../../ui-components/base-containers/base-containers";
import PendingProjects from "../../components/projects/pending-projects";
import CanceledProjects from "../../components/projects/canceled-projects";
import FinishedProjects from "../../components/projects/finished-projects";

interface IProjects {}

const Projects: React.FC<IProjects> = () => {
  return (
    <Fragment>
      <PageTitle>Projetos</PageTitle>
      <Tabs alignControls="start">
        <Tab title="Pendentes">
          <TabContentContainer>
            <PendingProjects />
          </TabContentContainer>
        </Tab>
        <Tab title="Finalizados">
          <TabContentContainer>
            <FinishedProjects />
          </TabContentContainer>
        </Tab>
        <Tab title="Cancelados">
          <TabContentContainer>
            <CanceledProjects />
          </TabContentContainer>
        </Tab>
      </Tabs>
    </Fragment>
  );
};

export default Projects;
