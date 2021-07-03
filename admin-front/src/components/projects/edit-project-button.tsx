import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { IProject } from "../../requests/projects/types";
import EmojiIcon from "../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../ui-components/icons/emojis";
import EditCreateProjectModal from "./edit-create-project-modal";

interface IEditProjectButton {
  project: IProject;
  refreshData: () => Promise<any>;
}

const EditProjectButton: React.FC<IEditProjectButton> = ({
  project,
  refreshData,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.edit} onClick={() => setIsEditModalOpen(true)} />
      <EditCreateProjectModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        data={project}
        refreshData={refreshData}
      />
    </Fragment>
  );
};

export default EditProjectButton;
