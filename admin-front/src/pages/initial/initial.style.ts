import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SHADOWS } from "../../ui-constants/shadows";
import { FONT_SIZES, RADIUS, SPACES } from "../../ui-constants/sizes";

export const ServicesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
`;

export const ServiceCard = styled.div`
  margin: ${SPACES.px10};
  padding: ${SPACES.px20};
  border-radius: ${RADIUS.card};
  width: 300px;
  text-align: center;
  font-size: ${FONT_SIZES.px20};
  font-weight: bold;
  color: white;
  background-color: ${COLORS.main};
  box-shadow: ${SHADOWS.card};
  cursor: pointer;

  :hover {
    background-color: ${COLORS.mainHover};
  }

  :active {
    background-color: ${COLORS.mainActive};
  }
`;
