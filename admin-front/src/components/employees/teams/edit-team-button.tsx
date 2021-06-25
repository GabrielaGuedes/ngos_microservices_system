import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { IEmployeeTeam } from "../../../requests/employees/types";
import EmojiIcon from "../../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../../ui-components/icons/emojis";
import EditCreateTeamModal from "./edit-create-team-modal";

interface IEditTeamButton {
  team: IEmployeeTeam;
  refreshData: () => void;
}

const EditTeamButton: React.FC<IEditTeamButton> = ({ team, refreshData }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.edit} onClick={() => setIsEditModalOpen(true)} />
      <EditCreateTeamModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        data={team}
        refreshTable={refreshData}
      />
    </Fragment>
  );
};

export default EditTeamButton;
