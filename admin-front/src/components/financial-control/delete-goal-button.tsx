import React, { Fragment } from "react";
import EmojiIcon from "../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../ui-components/icons/emojis";
import { errorToast } from "../../ui-components/toasts/toasts";
import AlertModal from "../../ui-components/alert-modal/alert-modal";
import { useState } from "react";
import { deleteGoal } from "../../requests/financial-control/delete-goal";

interface IDeleteGoalButton {
  id: number;
  value: number;
  refreshData: () => void;
}

const DeleteGoalButton: React.FC<IDeleteGoalButton> = ({
  id,
  value,
  refreshData,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    deleteGoal(id)
      .then(() => {
        refreshData();
      })
      .catch(() => errorToast());
  };
  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.trash} onClick={() => setIsAlertOpen(true)} />
      <AlertModal
        title={`Tem certeza que deseja excluir a meta de 'R$ ${value}'?`}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        onConfirm={handleClick}
      />
    </Fragment>
  );
};

export default DeleteGoalButton;
