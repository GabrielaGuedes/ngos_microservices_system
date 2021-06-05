import React from "react";
import { useLocation } from "react-router";
import { StyledLink } from "../../App.style";
import SidebarItem from "./sidebar-item";
import {
  DropdownContainer,
  DropdownItem,
  ServiceWithDropdown,
} from "./sidebar-item-with-dropdown.style";

interface IDropdownItems {
  to: string;
  label: string;
}

interface ISidebarItemWithDropdown {
  items: IDropdownItems[];
  emoji: string;
  label: string;
}

const SidebarItemWithDropdown: React.FC<ISidebarItemWithDropdown> = ({
  items,
  emoji,
  label,
}) => {
  const location = useLocation();

  return (
    <ServiceWithDropdown>
      <DropdownContainer className="dropdown-container">
        {items.map((item) => (
          <StyledLink to={item.to} key={`label-${item.label}`}>
            <DropdownItem active={location.pathname === item.to}>
              {item.label}
            </DropdownItem>
          </StyledLink>
        ))}
      </DropdownContainer>
      <SidebarItem
        to={items[0].to}
        emoji={emoji}
        label={label}
        active={items.map((item) => item.to).includes(location.pathname)}
      />
    </ServiceWithDropdown>
  );
};

export default SidebarItemWithDropdown;
