import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SHADOWS } from "../../ui-constants/shadows";
import { SPACES, WIDTHS } from "../../ui-constants/sizes";

export const ServiceWithDropdown = styled.div`
  display: block;

  @media only screen and (min-width: ${WIDTHS.mobileThreshold}) {
    :hover .dropdown-container {
      display: block;
    }
  }
`;

export const DropdownContainer = styled.div<{ mobileShow?: boolean }>`
  display: ${(props) => (props.mobileShow ? "block" : "none")};
  position: absolute;
  left: 100%;
  box-shadow: ${SHADOWS.sidebarDropdown};
  z-index: 1;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    position: static;
    left: auto;
  }
`;

export const DropdownItem = styled.div<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? COLORS.mainActive : COLORS.main};
  width: 100%;
  color: white;
  padding: ${SPACES.px20};
  display: block;

  :hover {
    background-color: ${COLORS.mainHover};
  }

  :active {
    background-color: ${COLORS.mainActive};
  }
`;
