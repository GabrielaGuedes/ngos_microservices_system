import styled from "styled-components";
import { FONT_SIZES, SPACES, WIDTHS } from "../../../ui-constants/sizes";

export const InfosContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${SPACES.px20};
  width: 80%;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    width: 100%;
`;

export const TotalDonated = styled.div`
  font-size: ${FONT_SIZES.px30};
`;
