import React, { Fragment, useEffect, useState } from "react";
import { StyledLink } from "../../App.style";
import { getServices } from "../../requests/settings/get-services-config";
import { IServicesConfig } from "../../requests/settings/types";
import { EMOJIS } from "../../ui-components/icons/emojis";
import { errorToast } from "../../ui-components/toasts/toasts";
import { PageTitle } from "../../ui-components/typography/page-title";
import { ServiceCard, ServicesContainer } from "./initial.style";

interface IInitial {}

const Initial: React.FC<IInitial> = () => {
  const [services, setServices] = useState<IServicesConfig>();

  useEffect(() => {
    getServices()
      .then((result) => setServices(result))
      .catch(() => errorToast());
  }, []);

  return (
    <Fragment>
      <PageTitle>Página inicial</PageTitle>
      <ServicesContainer>
        {services?.donations && (
          <StyledLink to="/donations">
            <ServiceCard>{EMOJIS.creditCard} Doações</ServiceCard>
          </StyledLink>
        )}
        {services?.employees && (
          <StyledLink to="/employees">
            <ServiceCard>{EMOJIS.shirt} Funcionários</ServiceCard>
          </StyledLink>
        )}
        {services?.volunteers && (
          <StyledLink to="/volunteers">
            <ServiceCard>{EMOJIS.volunteer} Voluntários</ServiceCard>
          </StyledLink>
        )}
        {services?.projects && (
          <StyledLink to="/projects">
            <ServiceCard>{EMOJIS.calendar} Projetos</ServiceCard>
          </StyledLink>
        )}
        {services?.financialControl && (
          <StyledLink to="/financial-control">
            <ServiceCard>{EMOJIS.dollar} Controle Financeiro</ServiceCard>
          </StyledLink>
        )}
        {services?.marketing && (
          <StyledLink to="/marketing">
            <ServiceCard>{EMOJIS.laptop} Marketing Digital</ServiceCard>
          </StyledLink>
        )}
        {services?.reports && (
          <StyledLink to="/reports">
            <ServiceCard>
              {EMOJIS.chart} Relatórios de Transparência
            </ServiceCard>
          </StyledLink>
        )}
        {services?.invoices && (
          <StyledLink to="/invoices">
            <ServiceCard>{EMOJIS.invoice} Doações de notas fiscais</ServiceCard>
          </StyledLink>
        )}
        <StyledLink to="/settings">
          <ServiceCard>{EMOJIS.gear} Configurações</ServiceCard>
        </StyledLink>
      </ServicesContainer>
    </Fragment>
  );
};

export default Initial;
