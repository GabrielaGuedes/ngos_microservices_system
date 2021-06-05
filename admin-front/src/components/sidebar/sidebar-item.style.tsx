import styled from "styled-components";
import { COLORS } from "../../ui-constants/colors";
import { SPACES } from "../../ui-constants/sizes";

export const SidebarService = styled.div<{ active?: boolean }>`
  padding: ${SPACES.px20};
  display: flex;
  flex-direction: row;
  color: white;
  background-color: ${(props) =>
    props.active ? COLORS.mainActive : COLORS.main};
  cursor: pointer;

  :hover {
    background-color: ${COLORS.mainHover};
  }

  :active {
    background-color: ${COLORS.mainActive};
  }
`;

export const EmojiContainer = styled.div`
  width: 30px;
  text-align: center;
`;
