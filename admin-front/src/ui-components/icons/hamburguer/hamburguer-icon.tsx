import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { HamburguerIconContainer } from "./hamburguer-icon.style";
import { SPACES } from "../../../ui-constants/sizes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IHamburguer {
  onClick?: () => void;
}

const HamburguerIcon: React.FC<IHamburguer> = ({ onClick }) => {
  return (
    <HamburguerIconContainer onClick={onClick}>
      <FontAwesomeIcon
        icon={faBars}
        color="white"
        style={{ paddingTop: SPACES.px10 }}
        cursor={onClick ? "pointer" : "auto"}
      />
    </HamburguerIconContainer>
  );
};

export default HamburguerIcon;
