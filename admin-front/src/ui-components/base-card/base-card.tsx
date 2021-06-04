import styled from "styled-components";
import { SHADOWS } from "../../ui-constants/shadows";
import { RADIUS, SPACES } from "../../ui-constants/sizes";

export const BaseCard = styled.div`
  border-radius: ${RADIUS.card};
  padding: ${SPACES.px20};
  box-shadow: ${SHADOWS.card};
`;
