import styled from "styled-components";
import { SPACES, WIDTHS } from "../../../ui-constants/sizes";

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${SPACES.px20};
`;

export const AddNewButtons = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    flex-direction: column-reverse;
  }
`;
