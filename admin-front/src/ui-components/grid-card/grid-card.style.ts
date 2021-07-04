import styled from "styled-components";
import { SPACES, WIDTHS } from "../../ui-constants/sizes";

export const CardContainer = styled.div<{ bigSize?: boolean }>`
  width: ${(props) => (props.bigSize ? WIDTHS.bigGridCard : WIDTHS.gridCard)};
  margin: ${SPACES.px10};
`;
