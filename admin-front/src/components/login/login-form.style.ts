import { Form } from "grommet";
import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { FONT_SIZES, SPACES } from "../../ui-constants/sizes";

export const LoginTitle = styled.div`
  font-size: ${FONT_SIZES.px30};
  font-weight: bold;
  color: ${COLORS.text};
  margin-bottom: ${SPACES.px10};
`;

export const StyledForm = styled(Form)`
  text-align: left;
`;
