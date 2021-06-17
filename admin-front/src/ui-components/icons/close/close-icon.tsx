import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { COLORS } from "../../../ui-constants/colors";

interface IClose {
  onClick?: () => void;
}

const CloseIcon: React.FC<IClose> = ({ onClick }) => {
  return (
    <FontAwesomeIcon
      onClick={onClick}
      icon={faTimes}
      color={COLORS.text}
      cursor={onClick ? "pointer" : "auto"}
      size="2x"
    />
  );
};

export default CloseIcon;
