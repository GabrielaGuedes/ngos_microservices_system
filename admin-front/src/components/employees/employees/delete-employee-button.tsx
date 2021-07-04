import React, { Fragment } from "react";
import { deleteEmployee } from "../../../requests/employees/delete-employee";
import EmojiIcon from "../../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../../ui-components/icons/emojis";
import { errorToast } from "../../../ui-components/toasts/toasts";
import AlertModal from "../../../ui-components/alert-modal/alert-modal";
import { useState } from "react";

interface IDeleteEmployeeButton {
  id: number;
  name: string;
  refreshTable: () => void;
}

const DeleteEmployeeButton: React.FC<IDeleteEmployeeButton> = ({
  id,
  name,
  refreshTable,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    deleteEmployee(id)
      .then(() => {
        refreshTable();
      })
      .catch(() => errorToast());
  };
  return (
    <Fragment>
      <EmojiIcon
        key={`delete-${id}-employee-emoji`}
        emoji={EMOJIS.trash}
        onClick={() => setIsAlertOpen(true)}
      />
      <AlertModal
        title={`Tem certeza que deseja excluir '${name}'?`}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        onConfirm={handleClick}
      />
    </Fragment>
  );
};

export default DeleteEmployeeButton;
