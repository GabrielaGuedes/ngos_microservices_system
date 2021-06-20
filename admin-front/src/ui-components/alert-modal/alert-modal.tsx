import React, { ReactNode } from "react";
import ReactModal from "react-modal";
import { SPACES } from "../../ui-constants/sizes";
import { customStyles, Title, ButtonsContainer } from "./alert-modal.style";
import Button from "../button/button";

interface IAlertModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  children?: ReactNode;
  onConfirm?: () => void;
  confirmLabel?: string;
}

const AlertModal: React.FC<IAlertModal> = ({
  isOpen,
  setIsOpen,
  title,
  children,
  onConfirm,
  confirmLabel,
}) => {
  const handleClose = () => {
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
      <Title>{title}</Title>
      {children}
      <ButtonsContainer>
        <Button
          onClick={handleClose}
          style={{ marginRight: SPACES.px4 }}
          kind="secondary"
          color="danger"
        >
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="danger">
          {confirmLabel || "Sim"}
        </Button>
      </ButtonsContainer>
    </ReactModal>
  );
};

export default AlertModal;
