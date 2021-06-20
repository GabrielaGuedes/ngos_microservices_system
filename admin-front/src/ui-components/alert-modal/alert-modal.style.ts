import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { FONT_SIZES, RADIUS, SPACES } from "../../ui-constants/sizes";
import { isMobile } from "../../utils/is-mobile";

const mobileStyles = {
  transform: "translate(0%, -50%)",
};

const desktopStyles = {
  left: "50%",
  right: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  padding: `${SPACES.px20} ${SPACES.px30}`,
};

const platformStyles = isMobile() ? mobileStyles : desktopStyles;

export const customStyles = {
  content: {
    ...platformStyles,
    top: "50%",
    bottom: "auto",
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.background,
    borderColor: COLORS.error,
    overflow: "hidden",
  },
};

export const Title = styled.div`
  font-size: ${FONT_SIZES.px24};
  color: ${COLORS.error};
  font-weight: bold;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: ${SPACES.px20};
`;
