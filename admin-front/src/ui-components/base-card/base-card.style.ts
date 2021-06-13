import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SHADOWS } from "../../ui-constants/shadows";
import { FONT_SIZES, RADIUS, SPACES, WIDTHS } from "../../ui-constants/sizes";

export const BaseCardStyled = styled.div`
  border-radius: ${RADIUS.card};
  padding: ${SPACES.px30};
  box-shadow: ${SHADOWS.card};
  max-width: 800px;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    padding: ${SPACES.px20};
    width: calc(100% - 2 * ${SPACES.px20});
    max-width: calc(100% - 2 * ${SPACES.px20});
  }
`;

export const CardTitle = styled.div`
  font-size: ${FONT_SIZES.px30};
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: ${SPACES.px20};

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    font-size: ${FONT_SIZES.px24};
    margin-bottom: ${SPACES.px10};
  }
`;
