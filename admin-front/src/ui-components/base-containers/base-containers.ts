import styled from "styled-components";
import { WIDTHS } from "../../ui-constants/sizes";

export const TupleFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    flex-direction: column;
  }
`;

export const HalfFieldContainer = styled.div`
  width: 47%;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    width: auto;
  }
`;
