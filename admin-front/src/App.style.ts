import { Link } from "react-router-dom";
import styled from "styled-components";
import { SPACES, WIDTHS } from "./ui-constants/sizes";

export const StyledPage = styled.div`
  position: relative;
  left: ${WIDTHS.desktopSidebar};
  padding: 0px ${SPACES.px30} ${SPACES.px30};
  width: calc(100% - ${WIDTHS.desktopSidebar} - 2 * ${SPACES.px30});
  overflow-x: auto;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    left: auto;
    padding: ${SPACES.px10};
    width: calc(100% - 2 * ${SPACES.px30});
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
