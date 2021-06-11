import styled from "styled-components";
import BaseCard from "../../../ui-components/base-card/base-card";
import { SPACES } from "../../../ui-constants/sizes";

export const ServicesCardStyled = styled(BaseCard)`
  max-width: 800px;
`;

export const ButtonContainer = styled.div`
  margin-top: ${SPACES.px10};
  text-align: right;
`;
