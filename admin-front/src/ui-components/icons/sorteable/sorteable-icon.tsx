import React from "react";
import { Blank } from "grommet-icons";

interface ISorteableIcon {}

const SorteableIcon: React.FC<ISorteableIcon> = () => {
  return (
    <Blank color="text-xweak" opacity="0.3">
      <g fill="none" stroke="#000" strokeWidth="2">
        <path d="M 6 10 L 12 6 L 18 10" />
        <path d="M 6 14 L 12 18 L 18 14" />
      </g>
    </Blank>
  );
};

export default SorteableIcon;
