import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SHADOWS } from "../../ui-constants/shadows";
import { FONT_SIZES, SPACES, WIDTHS } from "../../ui-constants/sizes";

export const StyledSidebar = styled.div`
  height: 100%;
  width: ${WIDTHS.desktopSidebar};
  background-color: ${COLORS.main};
  position: absolute;
  box-shadow: ${SHADOWS.sidebar};
`;

export const SidebarHeader = styled.div`
  padding: ${SPACES.px30};
  width: calc(100% - 2 * ${SPACES.px30});
  color: white;
  font-size: ${FONT_SIZES.px30};
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;

export const ExitButtonContainer = styled.div`
  display: block;
  padding: ${SPACES.px4} ${SPACES.px4} 0px;
  text-align: right;
`;
