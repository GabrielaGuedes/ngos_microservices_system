import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SHADOWS } from "../../ui-constants/shadows";
import { FONT_SIZES, RADIUS, SPACES } from "../../ui-constants/sizes";

export const ReasonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${SPACES.px20};
`;

export const ReasonCard = styled.div`
  margin: ${SPACES.px20};
  padding: ${SPACES.px20};
  border-radius: ${RADIUS.card};
  width: 500px;
  text-align: center;
  font-size: ${FONT_SIZES.px20};
  font-weight: bold;
  color: white;
  background-color: ${COLORS.main};
  box-shadow: ${SHADOWS.card};

  :hover {
    background-color: ${COLORS.mainHover};
  }

  :active {
    background-color: ${COLORS.mainActive};
  }
`;
