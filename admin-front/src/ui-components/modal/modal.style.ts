import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { FONT_SIZES, RADIUS, SPACES, WIDTHS } from "../../ui-constants/sizes";
import { isMobile } from "../../utils/is-mobile";

const mobileStyles = {
  transform: "translate(0%, -50%)",
};

const desktopStyles = {
  left: "50%",
  right: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
  width: 600,
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
    borderColor: COLORS.main,
    overflow: "hidden",
  },
};

export const Title = styled.div`
  font-size: ${FONT_SIZES.px24};
  color: ${COLORS.text};
  font-weight: bold;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${SPACES.px10};
`;

export const ChildrenContainer = styled.div`
  overflow-y: auto;
  max-height: 500px;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLORS.text};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.textActive};
  }

  @media only screen and (max-width: ${WIDTHS.mobileThreshold}) {
    max-height: 400px;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${SPACES.px10};
`;
