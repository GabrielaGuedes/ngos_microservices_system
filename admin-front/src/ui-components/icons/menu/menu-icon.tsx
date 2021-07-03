import React from "react";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { COLORS } from "../../../ui-constants/colors";

interface IMenuIcon {}

const MenuIcon: React.FC<IMenuIcon> = () => {
  return <FontAwesomeIcon icon={faEllipsisV} color={COLORS.main} />;
};

export default MenuIcon;
