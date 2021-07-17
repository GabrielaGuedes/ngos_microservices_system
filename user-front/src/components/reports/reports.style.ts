import styled from "styled-components";
import { SHADOWS } from "../../ui-constants/shadows";
import { FONT_SIZES, RADIUS, SPACES, WIDTHS } from "../../ui-constants/sizes";

export const ReportsStyled = styled.div`
  padding: ${SPACES.px30} 10%;
  overflow-x: hidden;
`;

export const Subtitle = styled.div`
  font-size: ${FONT_SIZES.px24};
  font-weight: bold;
  text-align: center;
  margin-bottom: ${SPACES.px20};
`;

export const ExportContainer = styled.div`
  width: 70%;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  border-radius: ${RADIUS.card};
  padding: ${SPACES.px20};
  box-shadow: ${SHADOWS.card};
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    flex-direction: column;
  }
`;

export const ChartContainer = styled.div`
  text-align: center;
  font-size: ${FONT_SIZES.px24};
`;

export const Chart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: ${SPACES.px20};

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    justify-content: flex-start;
  }
`;
