import styled from "styled-components";
import { WIDTHS } from "../../../ui-constants/sizes";

export const FinancialControlStyled = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    flex-direction: column-reverse;
  }
`;

export const TransactionsContainer = styled.div`
  width: 70%;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    width: auto;
  }
`;

export const StatusContainer = styled.div`
  width: 30%;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    width: 100%;
  }
`;
