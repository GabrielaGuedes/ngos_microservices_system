import React, { Fragment, useEffect, useState } from "react";
import { StyledLink } from "../../App.style";
import { getDetails } from "../../requests/settings/get-details-config";
import { getServices } from "../../requests/settings/get-services-config";
import { IServicesConfig } from "../../requests/settings/types";
import { TextButton } from "../../ui-components/buttons/buttons";
import { EMOJIS } from "../../ui-components/icons/emojis";
import { errorToast } from "../../ui-components/toasts/toasts";
import {
  SidebarHeader,
  StyledSidebar,
  ExitButtonContainer,
} from "./sidebar.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SidebarItem from "./sidebar-item";
import SidebarItemWithDropdown from "./sidebar-item-with-dropdown";

interface ISidebar {}

const Sidebar: React.FC<ISidebar> = () => {
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
    <Fragment>
      <StyledSidebar>
        <StyledLink to="/">
          <SidebarHeader>{name}</SidebarHeader>
        </StyledLink>
        {services?.donations && (
          <SidebarItemWithDropdown
            items={[
              { to: "/donations", label: "Doações feitas" },
              { to: "/donators", label: "Doadores" },
            ]}
            emoji={EMOJIS.creditCard}
            label="Doações"
          />
        )}
        {services?.employees && (
          <SidebarItemWithDropdown
            items={[
              { to: "/employees", label: "Funcionários" },
              { to: "/employees/areas", label: "Áreas" },
              { to: "/employees/teams", label: "Times" },
            ]}
            emoji={EMOJIS.shirt}
            label="Funcionários"
          />
        )}
        {services?.volunteers && (
          <SidebarItemWithDropdown
            items={[
              { to: "/volunteers", label: "Voluntários" },
              { to: "/volunteers/areas", label: "Áreas" },
              { to: "/volunteers/teams", label: "Times" },
            ]}
            emoji={EMOJIS.volunteer}
            label="Voluntários"
          />
        )}
        {services?.projects && (
          <SidebarItem
            to="/projects"
            emoji={EMOJIS.calendar}
            label="Projetos"
          />
        )}
        {services?.financialControl && (
          <SidebarItemWithDropdown
            items={[
              { to: "/financial-control", label: "Transações" },
              { to: "/financial-control/goals", label: "Metas" },
            ]}
            emoji={EMOJIS.dollar}
            label="Controle Financeiro"
          />
        )}
        {services?.marketing && (
          <SidebarItemWithDropdown
            items={[
              { to: "/marketing", label: "Posts (Rascunho)" },
              { to: "/marketing/posted", label: "Posts feitos" },
            ]}
            emoji={EMOJIS.laptop}
            label="Marketing Digital"
          />
        )}
        {services?.reports && (
          <SidebarItem
            to="/reports"
            emoji={EMOJIS.chart}
            label="Relatórios de Transparência"
          />
        )}
        {services?.invoices && (
          <SidebarItem
            to="/invoices"
            emoji={EMOJIS.invoice}
            label="Doações de notas fiscais"
          />
        )}
        <SidebarItem to="/settings" emoji={EMOJIS.gear} label="Configurações" />
      </StyledSidebar>
      <ExitButtonContainer>
        <FontAwesomeIcon icon={faBars} />
        <TextButton>Sair</TextButton>
      </ExitButtonContainer>
    </Fragment>
  );
};

export default Sidebar;
