import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { IVolunteer } from "../../../requests/volunteers/types";
import EmojiIcon from "../../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../../ui-components/icons/emojis";
import EditCreateVolunteerModal from "./edit-create-volunteer-modal";

interface IEditVolunteerButton {
  volunteer: IVolunteer;
  refreshTable: () => void;
}

const EditVolunteerButton: React.FC<IEditVolunteerButton> = ({
  volunteer,
  refreshTable,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.edit} onClick={() => setIsEditModalOpen(true)} />
      <EditCreateVolunteerModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        data={volunteer}
        refreshTable={refreshTable}
      />
    </Fragment>
  );
};

export default EditVolunteerButton;
