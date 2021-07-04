import styled from "styled-components";
import { SPACES, WIDTHS } from "../../../ui-constants/sizes";

export const FinancialControlStyled = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    flex-direction: column-reverse;
  }
`;

export const TransactionsContainer = styled.div`
  width: 70%;
  padding-right: ${SPACES.px10};

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    padding-right: 0px;
    width: auto;
  }
`;

export const StatusContainer = styled.div`
  width: 30%;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    width: 100%;
  }
`;
