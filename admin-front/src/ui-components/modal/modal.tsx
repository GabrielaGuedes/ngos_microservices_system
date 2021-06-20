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
import Button from "../button/button";
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
  confirmDisabled?: boolean;
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
  confirmDisabled,
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
          <Button
            onClick={handleClose}
            style={{ marginRight: SPACES.px4 }}
            kind="secondary"
          >
            Cancelar
          </Button>
          <Button onClick={onConfirm} disabled={confirmDisabled}>
            {confirmLabel}
          </Button>
        </FooterContainer>
      )}
    </ReactModal>
  );
};

export default Modal;
