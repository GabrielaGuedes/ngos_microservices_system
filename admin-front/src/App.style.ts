import { Link } from "react-router-dom";
import styled from "styled-components";
import { SPACES, WIDTHS } from "./ui-constants/sizes";

export const StyledPage = styled.div`
  position: relative;
  left: ${WIDTHS.desktopSidebar};
  padding: ${SPACES.px10};

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    left: auto;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
