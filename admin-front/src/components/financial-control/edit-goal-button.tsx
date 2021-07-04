import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { IGoal } from "../../requests/financial-control/types";
import EmojiIcon from "../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../ui-components/icons/emojis";
import EditCreateGoalModal from "./edit-create-goal-modal";

interface IEditGoalButton {
  goal: IGoal;
  refreshData: () => void;
}

const EditGoalButton: React.FC<IEditGoalButton> = ({ goal, refreshData }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.edit} onClick={() => setIsEditModalOpen(true)} />
      <EditCreateGoalModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        data={goal}
        refreshData={refreshData}
      />
    </Fragment>
  );
};

export default EditGoalButton;
