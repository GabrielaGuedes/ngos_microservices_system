import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  HamburguerIconContainer,
  FontAwesomeHamburguerIconStyled,
} from "./hamburguer-icon.style";

interface IHamburguer {
  style?: {};
  onClick?: () => void;
}

const HamburguerIcon: React.FC<IHamburguer> = ({ style, onClick }) => {
  return (
    <HamburguerIconContainer style={style} onClick={onClick}>
      <FontAwesomeHamburguerIconStyled icon={faBars} />
    </HamburguerIconContainer>
  );
};

export default HamburguerIcon;
