import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IHamburguer {
  onClick?: () => void;
}

const ChevronDownIcon: React.FC<IHamburguer> = ({ onClick }) => {
  return (
    <FontAwesomeIcon onClick={onClick} icon={faChevronDown} color="white" />
  );
};

export default ChevronDownIcon;
