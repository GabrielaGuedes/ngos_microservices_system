import React, { Fragment, useState } from "react";
import { useLocation } from "react-router";
import { StyledLink } from "../../App.style";
import SidebarItem from "./sidebar-item";
import {
  DropdownContainer,
  DropdownItem,
  ServiceWithDropdown,
} from "./sidebar-item-with-dropdown.style";
import ChevronDownIcon from "../../ui-components/icons/chevron-down/chevron-down-icon";
import ChevronUpIcon from "../../ui-components/icons/chevron-up/chevron-up-icon";

interface IDropdownItems {
  to: string;
  label: string;
}

interface ISidebarItemWithDropdown {
  items: IDropdownItems[];
  emoji: string;
  label: string;
  onChangePage?: () => void;
}

const SidebarItemWithDropdown: React.FC<ISidebarItemWithDropdown> = ({
  items,
  emoji,
  label,
  onChangePage,
}) => {
  const location = useLocation();
  const [icon, setIcon] = useState(<ChevronDownIcon />);

  const handleClick = () => {
    var cols = document.getElementById(`dropdown-container-${label}`);
    if (cols && (cols.style.height === "0px" || !cols?.style.height)) {
      cols.style.height = `${cols.scrollHeight}px`;
      setIcon(<ChevronUpIcon />);
    } else if (cols) {
      cols.style.height = "0px";
      setIcon(<ChevronDownIcon />);
    }
  };

  return (
    <Fragment>
      <ServiceWithDropdown onClick={() => handleClick()}>
        <SidebarItem
          emoji={emoji}
          label={label}
          active={items.map((item) => item.to).includes(location.pathname)}
          icon={icon}
        />
      </ServiceWithDropdown>
      <DropdownContainer id={`dropdown-container-${label}`}>
        {items.map((item) => (
          <StyledLink
            to={item.to}
            key={`label-${item.label}`}
            onClick={onChangePage}
          >
            <DropdownItem active={location.pathname === item.to}>
              {item.label}
            </DropdownItem>
          </StyledLink>
        ))}
      </DropdownContainer>
    </Fragment>
  );
};

export default SidebarItemWithDropdown;
