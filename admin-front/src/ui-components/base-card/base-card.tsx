import React from "react";
import { BaseCardStyled, CardTitle } from "./base-card.style";

interface IBaseCard {
  title?: string;
  children?: React.ReactNode;
  textAlign?: "center" | "left" | "right";
  style?: {};
}

const BaseCard: React.FC<IBaseCard> = ({
  title,
  children,
  textAlign,
  style,
}) => {
  return (
    <BaseCardStyled style={{ ...style, textAlign: textAlign }}>
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </BaseCardStyled>
  );
};

export default BaseCard;
