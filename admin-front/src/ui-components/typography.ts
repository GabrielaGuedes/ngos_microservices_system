import styled from "styled-components";
import { COLORS } from "../ui-constants/colors";
import { FONT_SIZES } from "../ui-constants/sizes";

export const Title = styled.div`
  font-size: ${FONT_SIZES.px40};
  color: ${COLORS.text};
  font-weight: bold;
`;

export const Label = styled.div`
  font-size: ${FONT_SIZES.px18};
  color: ${COLORS.text};
`;
