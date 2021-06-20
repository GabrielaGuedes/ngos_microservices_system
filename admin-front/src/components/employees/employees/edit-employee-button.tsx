import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { IEmployee } from "../../../requests/employees/types";
import EmojiIcon from "../../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../../ui-components/icons/emojis";
import EditCreateEmployeeModal from "./edit-create-employee-modal";

interface IEditEmployeeButton {
  employee: IEmployee;
  refreshTable: () => void;
}

const EditEmployeeButton: React.FC<IEditEmployeeButton> = ({
  employee,
  refreshTable,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.edit} onClick={() => setIsEditModalOpen(true)} />
      <EditCreateEmployeeModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        data={employee}
        refreshTable={refreshTable}
      />
    </Fragment>
  );
};

export default EditEmployeeButton;
