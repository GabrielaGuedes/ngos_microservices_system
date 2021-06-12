import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SHADOWS } from "../../ui-constants/shadows";
import { SPACES } from "../../ui-constants/sizes";

export const ServiceWithDropdown = styled.div`
  display: block;
`;

export const DropdownContainer = styled.div`
  box-shadow: ${SHADOWS.sidebarDropdown};
  height: 0;
  overflow: hidden;

  transition: height 0.5s;
  z-index: 1;
  position: static;
  left: auto;
`;

export const DropdownItem = styled.div<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? COLORS.mainActive : COLORS.main};
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
