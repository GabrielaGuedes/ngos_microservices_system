import React from "react";
import { BaseCardStyled, CardTitle, TopRow } from "./base-card.style";

interface IBaseCard {
  title?: string;
  topRightElement?: React.ReactNode;
  children?: React.ReactNode;
  textAlign?: "center" | "left" | "right";
  style?: {};
}

const BaseCard: React.FC<IBaseCard> = ({
  title,
  topRightElement,
  children,
  textAlign,
  style,
}) => {
  return (
    <BaseCardStyled style={{ ...style, textAlign: textAlign }}>
      <TopRow>
        {title ? <CardTitle>{title}</CardTitle> : <div />}
        {topRightElement}
      </TopRow>
      {children}
    </BaseCardStyled>
  );
};

export default BaseCard;
