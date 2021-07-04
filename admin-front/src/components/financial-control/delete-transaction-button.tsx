import React, { Fragment } from "react";
import EmojiIcon from "../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../ui-components/icons/emojis";
import { errorToast } from "../../ui-components/toasts/toasts";
import AlertModal from "../../ui-components/alert-modal/alert-modal";
import { useState } from "react";
import { deleteTransaction } from "../../requests/financial-control/delete-transaction";

interface IDeleteTransactionButton {
  id: number;
  value: number;
  refreshData: () => void;
}

const DeleteTransactionButton: React.FC<IDeleteTransactionButton> = ({
  id,
  value,
  refreshData,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    deleteTransaction(id)
      .then(() => {
        refreshData();
      })
      .catch(() => errorToast());
  };
  return (
    <Fragment>
      <EmojiIcon
        key={`delete-${id}-transaction-emoji`}
        emoji={EMOJIS.trash}
        onClick={() => setIsAlertOpen(true)}
      />
      <AlertModal
        title={`Tem certeza que deseja excluir a transação de 'R$ ${value}'?`}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        onConfirm={handleClick}
      />
    </Fragment>
  );
};

export default DeleteTransactionButton;
