import React, { Fragment } from "react";
import EmojiIcon from "../../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../../ui-components/icons/emojis";
import { errorToast } from "../../../ui-components/toasts/toasts";
import AlertModal from "../../../ui-components/alert-modal/alert-modal";
import { useState } from "react";
import { deleteArea } from "../../../requests/employees/delete-area";

interface IDeleteAreaButton {
  id: number;
  name: string;
  refreshData: () => void;
}

const DeleteAreaButton: React.FC<IDeleteAreaButton> = ({
  id,
  name,
  refreshData,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    deleteArea(id)
      .then(() => {
        refreshData();
      })
      .catch(() => errorToast());
  };
  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.trash} onClick={() => setIsAlertOpen(true)} />
      <AlertModal
        title={`Tem certeza que deseja excluir '${name}'?`}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        onConfirm={handleClick}
      />
    </Fragment>
  );
};

export default DeleteAreaButton;
