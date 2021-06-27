import styled from "styled-components";
import { SPACES } from "../../ui-constants/sizes";

export const Grid = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  margin-top: ${SPACES.px20};
`;
