import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { ITransaction } from "../../requests/financial-control/types";
import EmojiIcon from "../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../ui-components/icons/emojis";
import EditCreateTransactionModal from "./edit-create-transaction-modal";

interface IEditTransactionButton {
  transaction: ITransaction;
  refreshData: () => void;
}

const EditTransactionButton: React.FC<IEditTransactionButton> = ({
  transaction,
  refreshData,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.edit} onClick={() => setIsEditModalOpen(true)} />
      <EditCreateTransactionModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        data={transaction}
        refreshData={refreshData}
      />
    </Fragment>
  );
};

export default EditTransactionButton;
