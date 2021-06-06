import React, { Fragment, useState } from "react";
import { useLocation } from "react-router";
import { StyledLink } from "../../App.style";
import { isMobile } from "../../utils/is-mobile";
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
  onChangePage?: () => void;
}

const SidebarItemWithDropdown: React.FC<ISidebarItemWithDropdown> = ({
  items,
  emoji,
  label,
  onChangePage,
}) => {
  const location = useLocation();
  const [mobileShow, setMobileShow] = useState<boolean>(false);

  const dropdown = (
    <DropdownContainer
      className="dropdown-container"
      mobileShow={mobileShow && isMobile()}
    >
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
  );

  const sidebarItem = (
    <SidebarItem
      emoji={emoji}
      label={label}
      active={items.map((item) => item.to).includes(location.pathname)}
    />
  );

  return (
    <ServiceWithDropdown onClick={() => setMobileShow(!mobileShow)}>
      {isMobile() ? (
        <Fragment>
          {sidebarItem}
          {dropdown}
        </Fragment>
      ) : (
        <Fragment>
          {dropdown}
          {sidebarItem}
        </Fragment>
      )}
    </ServiceWithDropdown>
  );
};

export default SidebarItemWithDropdown;
