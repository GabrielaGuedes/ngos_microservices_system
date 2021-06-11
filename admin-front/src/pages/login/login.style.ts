import styled from "styled-components";
import { BaseCardStyled } from "../../ui-components/base-card/base-card.style";
import { SPACES, WIDTHS } from "../../ui-constants/sizes";

export const LoginPageContainer = styled.div`
  text-align: center;
  padding: ${SPACES.px40} ${SPACES.px40} 0px;
`;

export const LoginCard = styled(BaseCardStyled)`
  max-width: 600px;
  margin: 5% auto;

  @media only screen and (min-width: ${WIDTHS.mobileThreshold}) {
    padding-left: ${SPACES.px40};
    padding-right: ${SPACES.px40};
  }
`;
