import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { IVolunteerArea } from "../../../requests/volunteers/types";
import EmojiIcon from "../../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../../ui-components/icons/emojis";
import EditCreateAreaModal from "./edit-create-area-modal";

interface IEditAreaButton {
  area: IVolunteerArea;
  refreshData: () => void;
}

const EditAreaButton: React.FC<IEditAreaButton> = ({ area, refreshData }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.edit} onClick={() => setIsEditModalOpen(true)} />
      <EditCreateAreaModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        data={area}
        refreshTable={refreshData}
      />
    </Fragment>
  );
};

export default EditAreaButton;
