import React from "react";
import ReactModal from "react-modal";
import { customStyles, Header, Title, FooterContainer } from "./modal.style";
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
}

const Modal: React.FC<IModal> = ({
  isOpen,
  setIsOpen,
  title,
  children,
  footer,
  onConfirm,
  confirmLabel,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={() => setIsOpen(false)}
      ariaHideApp={false}
      style={customStyles}
    >
      <Header>
        <Title>{title}</Title>
        <CloseIcon onClick={() => setIsOpen(false)} />
      </Header>
      {children}
      {footer && (
        <FooterContainer>
          <SecondaryButton
            onClick={() => setIsOpen(false)}
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
