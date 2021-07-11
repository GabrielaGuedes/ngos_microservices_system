import React, { Fragment } from "react";
import EmojiIcon from "../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../ui-components/icons/emojis";
import { errorToast } from "../../ui-components/toasts/toasts";
import AlertModal from "../../ui-components/alert-modal/alert-modal";
import { useState } from "react";
import { deleteInvoice } from "../../requests/invoices/delete-invoice";

interface IDeleteInvoiceButton {
  id: string;
  donatorName: string;
  refreshData: () => void;
}

const DeleteInvoiceButton: React.FC<IDeleteInvoiceButton> = ({
  id,
  donatorName,
  refreshData,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    deleteInvoice(id)
      .then(() => {
        refreshData();
      })
      .catch(() => errorToast());
  };
  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.trash} onClick={() => setIsAlertOpen(true)} />
      <AlertModal
        title={`Tem certeza que deseja excluir a doação de '${donatorName}'?`}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        onConfirm={handleClick}
      />
    </Fragment>
  );
};

export default DeleteInvoiceButton;
