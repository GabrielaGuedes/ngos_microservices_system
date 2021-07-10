import React, { Fragment, useState } from "react";
import { IPost } from "../../requests/marketing/types";
import EmojiIcon from "../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../ui-components/icons/emojis";
import EditCreatePostModal from "./edit-create-post-modal";

interface IEditPostButton {
  post: IPost;
  refreshData: () => void;
}

const EditPostButton: React.FC<IEditPostButton> = ({ post, refreshData }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.edit} onClick={() => setIsEditModalOpen(true)} />
      <EditCreatePostModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        data={post}
        refreshData={refreshData}
      />
    </Fragment>
  );
};

export default EditPostButton;
