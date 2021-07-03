import styled from "styled-components";
import { FONT_SIZES, SPACES } from "../../ui-constants/sizes";

export const RowContainer = styled.div`
  margin-bottom: ${SPACES.px10};
`;

export const Subtitle = styled.div`
  font-size: ${FONT_SIZES.px24};
  font-weight: bold;
`;

export const DateContainer = styled.div`
  font-size: ${FONT_SIZES.px24};
  font-weight: bold;
  text-align: right;
`;

export const ExpectedValue = styled.div<{ color: string }>`
  font-size: ${FONT_SIZES.px20};
  font-weight: bold;
  color: ${(props) => props.color};
`;
