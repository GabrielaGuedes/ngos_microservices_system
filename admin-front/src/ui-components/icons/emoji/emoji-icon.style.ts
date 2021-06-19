import styled from "styled-components";
import { COLORS } from "../../../ui-constants/colors";
import { RADIUS, SPACES } from "../../../ui-constants/sizes";

export const EmojiIconContainer = styled.div`
  border-radius: ${RADIUS.card};
  cursor: pointer;
  padding: ${SPACES.px10};

  :hover {
    background-color: ${COLORS.mainTransparent};
  }

  :active {
    background-color: ${COLORS.mainActiveTransparent};
  }
`;
