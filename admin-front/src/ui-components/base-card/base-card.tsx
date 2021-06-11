import React from "react";
import { BaseCardStyled, CardTitle } from "./base-card.style";

interface IBaseCard {
  title?: string;
  children?: React.ReactNode;
}

const BaseCard: React.FC<IBaseCard> = ({ title, children }) => {
  return (
    <BaseCardStyled>
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </BaseCardStyled>
  );
};

export default BaseCard;
