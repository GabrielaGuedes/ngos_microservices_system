import styled from "styled-components";
import { COLORS } from "../../../ui-constants/colors";
import { RADIUS } from "../../../ui-constants/sizes";

export const HamburguerIconContainer = styled.div`
  background-color: ${COLORS.main};
  border-radius: ${RADIUS.card};
  text-align: center;
  height: 40px;
  width: 40px;
  display: inline-block;

  :active {
    background-color: ${COLORS.mainActive};
  }
`;
