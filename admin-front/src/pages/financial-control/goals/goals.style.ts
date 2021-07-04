import styled from "styled-components";
import { SPACES, WIDTHS } from "../../../ui-constants/sizes";

export const TopItensContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const NewGoalButton = styled.div`
  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    margin-bottom: ${SPACES.px10};
  }
`;
