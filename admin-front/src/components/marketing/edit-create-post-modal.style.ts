import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { FONT_SIZES, SPACES } from "../../ui-constants/sizes";

export const FileContainer = styled.div`
  border: 1px solid ${COLORS.coral};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${SPACES.px4};
  padding: ${SPACES.px4};
`;

export const FilesLabel = styled.div`
  font-size: ${FONT_SIZES.px18};
  line-height: 24px;
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 6px;
  margin-bottom: 6px;
`;

export const Files = styled.div`
  display: flex;
`;
