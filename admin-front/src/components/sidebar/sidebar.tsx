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
import SidebarItem from "./sidebar-item";
import SidebarItemWithDropdown from "./sidebar-item-with-dropdown";
import HamburguerIcon from "../../ui-components/icons/hamburguer/hamburguer-icon";
import { isMobile } from "../../utils/is-mobile";
import { endSession } from "../../utils/session";

interface ISidebar {}

const Sidebar: React.FC<ISidebar> = () => {
  const [name, setName] = useState<string>();
  const [services, setServices] = useState<IServicesConfig>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getDetails()
      .then((result) => setName(result.name))
      .catch(() => errorToast());
    getServices()
      .then((result) => setServices(result))
      .catch(() => errorToast());
  }, []);

  const handleHamburguerClick = () => setIsOpen(!isOpen);

  const handleChangePage = () => setIsOpen(false);

  const handleLogout = () => {
    endSession();
  };

  return (
    <Fragment>
      <StyledSidebar show={!isMobile() || isOpen}>
        <StyledLink to="/">
          <SidebarHeader onClick={handleChangePage}>{name}</SidebarHeader>
        </StyledLink>
        {services?.donations && (
          <SidebarItemWithDropdown
            items={[
              { to: "/donations", label: "Doações feitas" },
              { to: "/donations/donators", label: "Doadores" },
            ]}
            emoji={EMOJIS.creditCard}
            label="Doações"
            onChangePage={handleChangePage}
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
            onChangePage={handleChangePage}
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
            onChangePage={handleChangePage}
          />
        )}
        {services?.projects && (
          <SidebarItem
            to="/projects"
            emoji={EMOJIS.calendar}
            label="Projetos"
            onChangePage={handleChangePage}
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
            onChangePage={handleChangePage}
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
            onChangePage={handleChangePage}
          />
        )}
        {services?.reports && (
          <SidebarItem
            to="/reports"
            emoji={EMOJIS.chart}
            label="Relatórios de Transparência"
            onChangePage={handleChangePage}
          />
        )}
        {services?.invoices && (
          <SidebarItem
            to="/invoices"
            emoji={EMOJIS.invoice}
            label="Doações de notas fiscais"
            onChangePage={handleChangePage}
          />
        )}
        <SidebarItem
          to="/settings"
          emoji={EMOJIS.gear}
          label="Configurações"
          onChangePage={handleChangePage}
        />
      </StyledSidebar>
      <ExitButtonContainer>
        {isMobile() && <HamburguerIcon onClick={handleHamburguerClick} />}
        <TextButton onClick={handleLogout}>Sair</TextButton>
      </ExitButtonContainer>
    </Fragment>
  );
};

export default Sidebar;
