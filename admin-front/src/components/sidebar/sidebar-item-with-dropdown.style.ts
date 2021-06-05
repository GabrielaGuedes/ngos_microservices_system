import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SHADOWS } from "../../ui-constants/shadows";
import { SPACES } from "../../ui-constants/sizes";

export const ServiceWithDropdown = styled.div`
  display: block;
  :hover .dropdown-container {
    display: block;
  }
`;

export const DropdownContainer = styled.div`
  display: none;
  position: absolute;
  left: 100%;
  box-shadow: ${SHADOWS.sidebarDropdown};
  z-index: 1;
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
