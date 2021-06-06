import React, { Fragment } from "react";
import { useLocation } from "react-router";
import { StyledLink } from "../../App.style";
import { EmojiContainer, SidebarService } from "./sidebar-item.style";

interface ISidebarItem {
  to?: string;
  emoji: string;
  label: string;
  active?: boolean;
  onChangePage?: () => void;
}

const SidebarItem: React.FC<ISidebarItem> = ({
  to,
  emoji,
  label,
  active,
  onChangePage,
}) => {
  const location = useLocation();

  const sidebarService = (
    <SidebarService active={active || to === location.pathname}>
      <EmojiContainer>{emoji}</EmojiContainer>
      {` ${label}`}
    </SidebarService>
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
