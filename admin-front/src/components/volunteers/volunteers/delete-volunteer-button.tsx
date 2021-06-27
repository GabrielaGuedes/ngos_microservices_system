import React, { Fragment } from "react";
import { deleteVolunteer } from "../../../requests/volunteers/delete-volunteer";
import EmojiIcon from "../../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../../ui-components/icons/emojis";
import { errorToast } from "../../../ui-components/toasts/toasts";
import AlertModal from "../../../ui-components/alert-modal/alert-modal";
import { useState } from "react";

interface IDeleteVolunteerButton {
  id: number;
  name: string;
  refreshTable: () => void;
}

const DeleteVolunteerButton: React.FC<IDeleteVolunteerButton> = ({
  id,
  name,
  refreshTable,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    deleteVolunteer(id)
      .then(() => {
        refreshTable();
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

export default DeleteVolunteerButton;
