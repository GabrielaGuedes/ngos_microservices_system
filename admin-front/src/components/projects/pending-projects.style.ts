import styled from "styled-components";
import { FONT_SIZES, WIDTHS } from "../../ui-constants/sizes";

export const PendingProjectsStyled = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    flex-direction: column-reverse;
  }
`;

export const ProjectsGridContainer = styled.div`
  width: 70%;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    width: auto;
  }
`;

export const ProjectsExpectationsContainer = styled.div`
  width: 30%;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    width: 100%;
  }
`;

export const ExpectedValue = styled.div`
  font-size: ${FONT_SIZES.px24};
`;
