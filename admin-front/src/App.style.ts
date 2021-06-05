import { Link } from "react-router-dom";
import styled from "styled-components";
import { WIDTHS } from "./ui-constants/sizes";

export const StyledPage = styled.div`
  position: relative;
  left: ${WIDTHS.desktopSidebar};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;