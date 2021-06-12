import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SHADOWS } from "../../ui-constants/shadows";
import { FONT_SIZES, SPACES, WIDTHS } from "../../ui-constants/sizes";

export const StyledSidebar = styled.div<{ show?: boolean }>`
  height: 100%;
  width: ${WIDTHS.desktopSidebar};
  background-color: ${COLORS.main};
  position: fixed;
  box-shadow: ${SHADOWS.sidebar};
  display: ${(props) => (props.show ? "block" : "none")};
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLORS.text};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.textActive};
  }

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    top: 50px;
    width: 100%;
    z-index: 1;
    height: calc(100% - 54px); // 54 due to ExitButtonContainer
  }
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

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;
