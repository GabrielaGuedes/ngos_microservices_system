import React, { ReactNode } from "react";
import { StyledButton } from "./buttons";

interface IButton {
  kind?: "primary" | "secondary" | "text";
  onClick?: () => void;
  color?: "default" | "danger";
  disabled?: boolean;
  style?: any;
  type?: "button" | "submit" | "reset" | undefined;
  children?: ReactNode;
}

const Button: React.FC<IButton> = ({
  kind = "primary",
  color = "default",
  onClick,
  disabled,
  style,
  type,
  children,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      kind={kind}
      disabled={disabled}
      danger={color === "danger"}
      style={style}
      type={type}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
