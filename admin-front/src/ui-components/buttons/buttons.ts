import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { FONT_SIZES } from "../../ui-constants/sizes";

export const Button = styled.button`
  border: 2px solid ${COLORS.mainHover};
  border-radius: 18px;
  cursor: pointer;
  padding: 4px 22px;
  font-size: ${FONT_SIZES.px18};
  background-color: ${COLORS.main};
  color: white;
  font-weight: bold;

  :hover {
    background-color: ${COLORS.mainHover};
  }

  :active {
    background-color: ${COLORS.mainActive};
  }
`;

export const TextButton = styled.button`
  border: none;
  border-radius: 18px;
  cursor: pointer;
  padding: 4px 22px;
  font-size: ${FONT_SIZES.px18};
  background-color: transparent;
  color: ${COLORS.main};
  font-weight: bold;

  :hover {
    background-color: ${COLORS.mainTransparent};
  }

  :active {
    background-color: ${COLORS.mainActiveTransparent};
  }
`;
