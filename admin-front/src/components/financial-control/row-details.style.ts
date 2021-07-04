import styled from "styled-components";
import { SPACES, WIDTHS } from "../../ui-constants/sizes";

export const RowContainer = styled.div`
  padding-left: 5%;
  width: 100%;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    padding-left: 0px;
    min-width: 0px;
  }
`;

export const ItemContainer = styled.div`
  margin-bottom: ${SPACES.px4};
`;
