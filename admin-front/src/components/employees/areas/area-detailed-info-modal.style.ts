import styled from "styled-components";
import { COLORS } from "../../../ui-constants/colors";
import { FONT_SIZES, SPACES } from "../../../ui-constants/sizes";

export const DescriptionContainer = styled.div`
  margin-bottom: ${SPACES.px10};
`;

export const Subtitle = styled.div`
  font-size: ${FONT_SIZES.px24};
  font-weight: bold;
`;

export const EmployeeRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.lightCoral};
`;

export const EmployeeCol = styled.div`
  width: 50%;
`;
