import styled from "styled-components";
import { SPACES } from "../../../ui-constants/sizes";

export const TeamCardContainer = styled.div`
  width: 325px;
  margin: ${SPACES.px10};
`;

export const IconsContainer = styled.div`
  display: flex;
`;

export const BottomButtonsContainer = styled.div`
  margin-top: ${SPACES.px10};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
