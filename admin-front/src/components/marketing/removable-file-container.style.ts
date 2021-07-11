import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SPACES } from "../../ui-constants/sizes";

export const FileContainer = styled.div`
  border: 1px solid ${COLORS.coral};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${SPACES.px4};
  padding: ${SPACES.px4};
`;
