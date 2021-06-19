import React from "react";
import ReactModal from "react-modal";
import {
  customStyles,
  Header,
  Title,
  FooterContainer,
  ChildrenContainer,
} from "./modal.style";
import CloseIcon from "../../ui-components/icons/close/close-icon";
import { ReactNode } from "react";
import { Button, SecondaryButton } from "../buttons/buttons";
import { SPACES } from "../../ui-constants/sizes";

interface IModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  children?: ReactNode;
  footer?: boolean;
  onConfirm?: () => void;
  confirmLabel?: string;
  beforeClose?: () => void;
}

const Modal: React.FC<IModal> = ({
  isOpen,
  setIsOpen,
  title,
  children,
  footer,
  onConfirm,
  confirmLabel,
  beforeClose,
}) => {
  const handleClose = () => {
    beforeClose && beforeClose();
    setIsOpen(false);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleClose}
      ariaHideApp={false}
      style={customStyles}
    >
      <Header>
        <Title>{title}</Title>
        <CloseIcon onClick={handleClose} />
      </Header>
      <ChildrenContainer>{children}</ChildrenContainer>
      {footer && (
        <FooterContainer>
          <SecondaryButton
            onClick={handleClose}
            style={{ marginRight: SPACES.px4 }}
          >
            Cancelar
          </SecondaryButton>
          <Button onClick={onConfirm}>{confirmLabel}</Button>
        </FooterContainer>
      )}
    </ReactModal>
  );
};

export default Modal;
