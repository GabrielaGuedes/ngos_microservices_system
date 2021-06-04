import styled from "styled-components";
import { BaseCard } from "../../ui-components/base-card/base-card";
import { COLORS } from "../../ui-constants/colors";
import { SPACES } from "../../ui-constants/sizes";

export const LoginPageContainer = styled.div`
  text-align: center;
  background-color: ${COLORS.background};
  height: calc(100vh - ${SPACES.px40});
  padding: ${SPACES.px40} ${SPACES.px40} 0px;
`;

export const LoginCard = styled(BaseCard)`
  max-width: 600px;
  margin: 10% auto;

  @media only screen and (min-width: 600px) {
    padding-left: ${SPACES.px40};
    padding-right: ${SPACES.px40};
  }
`;