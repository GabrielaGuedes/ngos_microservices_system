import React from "react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IHamburguer {
  onClick?: () => void;
}

const ChevronUpIcon: React.FC<IHamburguer> = ({ onClick }) => {
  return <FontAwesomeIcon onClick={onClick} icon={faChevronUp} color="white" />;
};

export default ChevronUpIcon;
