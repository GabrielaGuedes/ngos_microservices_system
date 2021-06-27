import React, { ReactNode } from "react";
import BaseCard from "../base-card/base-card";
import { CardContainer } from "./grid-card.style";

interface IGridCard {
  title: string;
  children: ReactNode;
}

const GridCard: React.FC<IGridCard> = ({ title, children }) => {
  return (
    <CardContainer>
      <BaseCard title={title}>{children}</BaseCard>
    </CardContainer>
  );
};

export default GridCard;
