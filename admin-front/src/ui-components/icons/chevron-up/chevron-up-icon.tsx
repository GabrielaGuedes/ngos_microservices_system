import React from "react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IChevronUpIcon {
  onClick?: () => void;
}

const ChevronUpIcon: React.FC<IChevronUpIcon> = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      onClick={onClick}
      icon={faChevronUp}
      color="white"
      cursor={onClick ? "pointer" : "auto"}
    />
  );
};

export default ChevronUpIcon;
