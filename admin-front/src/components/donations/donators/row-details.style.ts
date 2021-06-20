import styled from "styled-components";
import { SPACES, WIDTHS } from "../../../ui-constants/sizes";

export const RowContainer = styled.div`
  padding-left: 5%;
  width: 100%;
  min-width: 60vw;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    padding-left: 0px;
    min-width: 0px;
  }
`;

export const TupleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${SPACES.px4};

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    flex-direction: column;
    margin-bottom: 0px;
  }
`;

export const TupleItem = styled.div`
  width: 50%;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    margin-bottom: ${SPACES.px4};
  }
`;
