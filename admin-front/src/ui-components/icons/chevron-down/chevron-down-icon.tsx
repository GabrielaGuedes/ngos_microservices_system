import React from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IChevronDownIcon {
  onClick?: () => void;
}

const ChevronDownIcon: React.FC<IChevronDownIcon> = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      onClick={onClick}
      icon={faChevronDown}
      color="white"
      cursor={onClick ? "pointer" : "auto"}
    />
  );
};

export default ChevronDownIcon;
