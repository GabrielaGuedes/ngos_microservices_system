import React, { Fragment } from "react";
import EmojiIcon from "../../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../../ui-components/icons/emojis";
import { errorToast } from "../../../ui-components/toasts/toasts";
import AlertModal from "../../../ui-components/alert-modal/alert-modal";
import { useState } from "react";
import { deleteTeam } from "../../../requests/employees/delete-team";

interface IDeleteTeamButton {
  id: number;
  name: string;
  refreshData: () => void;
}

const DeleteTeamButton: React.FC<IDeleteTeamButton> = ({
  id,
  name,
  refreshData,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    deleteTeam(id)
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

export default DeleteTeamButton;
