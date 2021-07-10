import React, { Fragment, useState } from "react";
import { deletePost } from "../../requests/marketing/delete-post";
import { removeFiles } from "../../requests/marketing/remove-files";
import AlertModal from "../../ui-components/alert-modal/alert-modal";
import EmojiIcon from "../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../ui-components/icons/emojis";
import { errorToast } from "../../ui-components/toasts/toasts";

const FILE_DIRECTORY = "public-files/";

interface IDeletePostButton {
  id: number;
  title: string;
  files: string[];
  refreshData: () => void;
}

const DeletePostButton: React.FC<IDeletePostButton> = ({
  id,
  title,
  files,
  refreshData,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClick = () => {
    deletePost(id)
      .then(() => {
        removeFiles({ paths: files.map((f) => FILE_DIRECTORY + f) });
        refreshData();
      })
      .catch(() => errorToast());
  };
  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.trash} onClick={() => setIsAlertOpen(true)} />
      <AlertModal
        title={`Tem certeza que deseja excluir o post '${title}'?`}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        onConfirm={handleClick}
      />
    </Fragment>
  );
};

export default DeletePostButton;
