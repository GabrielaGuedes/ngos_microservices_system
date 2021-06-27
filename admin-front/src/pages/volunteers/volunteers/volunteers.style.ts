import styled from "styled-components";
import { WIDTHS } from "../../../ui-constants/sizes";

export const AddNewButtons = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    flex-direction: column-reverse;
  }
`;
