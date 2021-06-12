import React, { Fragment } from "react";
import { useLocation } from "react-router";
import { StyledLink } from "../../App.style";
import {
  EmojiContainer,
  SidebarService,
  SidebarServiceContainer,
} from "./sidebar-item.style";

interface ISidebarItem {
  to?: string;
  emoji: string;
  label: string;
  active?: boolean;
  onChangePage?: () => void;
  icon?: React.ReactNode;
}

const SidebarItem: React.FC<ISidebarItem> = ({
  to,
  emoji,
  label,
  active,
  onChangePage,
  icon,
}) => {
  const location = useLocation();

  const sidebarService = (
    <SidebarServiceContainer active={active || to === location.pathname}>
      <SidebarService>
        <EmojiContainer>{emoji}</EmojiContainer>
        {` ${label}`}
      </SidebarService>
      {icon}
    </SidebarServiceContainer>
  );

  return (
    <Fragment>
      {to ? (
        <StyledLink to={to} onClick={onChangePage}>
          {sidebarService}
        </StyledLink>
      ) : (
        sidebarService
      )}
    </Fragment>
  );
};

export default SidebarItem;
