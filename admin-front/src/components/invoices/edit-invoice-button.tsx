import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import { IInvoice } from "../../requests/invoices/types";
import EmojiIcon from "../../ui-components/icons/emoji/emoji-icon";
import { EMOJIS } from "../../ui-components/icons/emojis";
import EditCreateInvoiceModal from "./edit-create-invoice-modal";

interface IEditInvoiceButton {
  invoice: IInvoice;
  refreshData: () => void;
}

const EditInvoiceButton: React.FC<IEditInvoiceButton> = ({
  invoice,
  refreshData,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <Fragment>
      <EmojiIcon emoji={EMOJIS.edit} onClick={() => setIsEditModalOpen(true)} />
      <EditCreateInvoiceModal
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        data={invoice}
        refreshData={refreshData}
      />
    </Fragment>
  );
};

export default EditInvoiceButton;
