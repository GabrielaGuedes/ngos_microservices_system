import React, { ReactNode } from "react";
import BaseCard from "../base-card/base-card";
import { CardContainer } from "./grid-card.style";

interface IGridCard {
  title: string;
  children: ReactNode;
  topRightElement?: ReactNode;
  size?: "normal" | "large";
}

const GridCard: React.FC<IGridCard> = ({
  title,
  children,
  topRightElement,
  size = "normal",
}) => {
  return (
    <CardContainer bigSize={size === "large"}>
      <BaseCard title={title} topRightElement={topRightElement}>
        {children}
      </BaseCard>
    </CardContainer>
  );
};

export default GridCard;
