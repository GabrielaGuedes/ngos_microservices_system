import styled from "styled-components";
import { BUTTONS_COLORS } from "../../ui-constants/colors";
import { FONT_SIZES, RADIUS } from "../../ui-constants/sizes";

export const StyledButton = styled.button<{
  kind: string;
  danger: boolean;
  disabled?: boolean;
}>`
  border: ${(props) =>
    props.kind === "text"
      ? "none"
      : `2px solid ${BUTTONS_COLORS(props.danger)[props.kind].border}`};
  border-radius: ${RADIUS.button};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  padding: 4px 22px;
  font-size: ${FONT_SIZES.px18};
  background-color: ${(props) =>
    props.disabled
      ? BUTTONS_COLORS(props.danger)[props.kind].disabledBackground
      : BUTTONS_COLORS(props.danger)[props.kind].background};
  color: ${(props) => BUTTONS_COLORS(props.danger)[props.kind].font};
  font-weight: bold;

  :hover {
    background-color: ${(props) =>
      BUTTONS_COLORS(props.danger)[props.kind].hover};
  }

  :active {
    background-color: ${(props) =>
      BUTTONS_COLORS(props.danger)[props.kind].active};
  }
`;
