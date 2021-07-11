import React, { useState } from "react";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../ui-components/toasts/toasts";
import Modal from "../../ui-components/modal/modal";
import { Form, FormField, DateInput, TextInput } from "grommet";
import {
  TupleFieldContainer,
  HalfFieldContainer,
} from "../../ui-components/base-containers/base-containers";
import { IInvoice, INewInvoice } from "../../requests/invoices/types";
import { createInvoice } from "../../requests/invoices/create-invoice";
import { updateInvoice } from "../../requests/invoices/update-invoice";

interface IEditCreateInvoiceModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshData: () => void;
  data?: IInvoice;
  creation?: boolean;
}

const EditCreateInvoiceModal: React.FC<IEditCreateInvoiceModal> = ({
  isOpen,
  setIsOpen,
  refreshData,
  data,
  creation,
}) => {
  const [formValues, setFormValues] = useState<INewInvoice | any>(data);
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(
    Boolean(creation)
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSuccess = () => {
    refreshData();
    creation && setFormValues({});
    setLoading(false);
    successToast();
    setIsOpen(false);
  };

  const handleError = () => {
    errorToast();
    setLoading(false);
    setFormIsInvalid(false);
  };

  const handleConfirm = () => {
    setLoading(true);
    loadingToast();
    if (creation) {
      createInvoice(formValues)
        .then(() => {
          handleSuccess();
        })
        .catch(() => {
          handleError();
        });
    } else {
      console.log(data);
      data &&
        updateInvoice(formValues, data?._id)
          .then(() => {
            handleSuccess();
          })
          .catch(() => {
            handleError();
          });
    }
  };

  return (
    <Modal
      title={creation ? "Novo registro de doação" : "Editar registro de doação"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer
      confirmLabel={creation ? "Criar" : "Editar"}
      onConfirm={handleConfirm}
      confirmDisabled={formIsInvalid || loading}
    >
      <Form
        validate="change"
        value={formValues}
        onChange={(nextValue) => setFormValues(nextValue)}
        onValidate={(event) => {
          setFormIsInvalid(!event.valid);
        }}
        messages={{ required: "Obrigatório" }}
      >
        <TupleFieldContainer>
          <HalfFieldContainer>
            <FormField label="Nome do doador" name="donatorName" required>
              <TextInput
                name="donatorName"
                type="text"
                placeholder="João da Silva"
              />
            </FormField>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Data da doação" name="donationDate" required>
              <DateInput
                name="donationDate"
                format="dd/mm/yyyy"
                placeholder="dd/mm/aaaa"
              />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
        <FormField label="Email do doador" name="donatorEmail">
          <TextInput name="donatorEmail" placeholder="joao@examplo.com" />
        </FormField>
      </Form>
    </Modal>
  );
};

export default EditCreateInvoiceModal;
