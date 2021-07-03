import React from "react";
import { Menu } from "grommet";
import MenuIcon from "../icons/menu/menu-icon";

export interface IMoreOptionsItem {
  label: string;
  onClick: () => void;
}

interface IMoreOptions {
  items: IMoreOptionsItem[];
}

const MoreOptions: React.FC<IMoreOptions> = ({ items }) => {
  return <Menu label="" items={items} icon={<MenuIcon />} size="small" />;
};

export default MoreOptions;
