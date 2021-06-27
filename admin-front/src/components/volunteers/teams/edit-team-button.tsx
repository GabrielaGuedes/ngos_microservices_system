import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { IVolunteerTeam } from "../../../requests/volunteers/types";
import EmojiIcon from "../../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../../ui-components/icons/emojis";
import EditCreateTeamModal from "./edit-create-team-modal";

interface IEditTeamButton {
  team: IVolunteerTeam;
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
