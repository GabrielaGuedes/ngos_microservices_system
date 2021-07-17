import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SPACES } from "../../ui-constants/sizes";

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${SPACES.px30};
  color: ${COLORS.text};
`;
