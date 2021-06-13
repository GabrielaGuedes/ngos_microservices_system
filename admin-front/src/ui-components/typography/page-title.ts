import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { FONT_SIZES, SPACES } from "../../ui-constants/sizes";

export const PageTitle = styled.div`
  font-size: ${FONT_SIZES.px40};
  color: ${COLORS.text};
  font-weight: bold;
  margin: 0px ${SPACES.px10} ${SPACES.px30};
  line-height: initial;
`;
