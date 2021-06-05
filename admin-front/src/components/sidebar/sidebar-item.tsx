import React from "react";
import { useLocation } from "react-router";
import { StyledLink } from "../../App.style";
import { EmojiContainer, SidebarService } from "./sidebar-item.style";

interface ISidebarItem {
  to: string;
  emoji: string;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<ISidebarItem> = ({ to, emoji, label, active }) => {
  const location = useLocation();

  return (
    <StyledLink to={to}>
      <SidebarService active={active || to === location.pathname}>
        <EmojiContainer>{emoji}</EmojiContainer>
        {` ${label}`}
      </SidebarService>
    </StyledLink>
  );
};

export default SidebarItem;
