import React, { useState, useEffect } from "react";
import { createTransaction } from "../../requests/financial-control/create-transation";
import {
  INewTransaction,
  ITransaction,
} from "../../requests/financial-control/types";
import { updateTransaction } from "../../requests/financial-control/update-transaction";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../ui-components/toasts/toasts";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";
import Modal from "../../ui-components/modal/modal";
import {
  Form,
  FormField,
  DateInput,
  TextInput,
  Select,
  CheckBox,
} from "grommet";
import {
  TupleFieldContainer,
  HalfFieldContainer,
} from "../../ui-components/base-containers/base-containers";
import { CheckboxContainer } from "./edit-create-transaction-modal.style";

const KIND_OPTIONS = [
  { label: "Entrada", value: "IN" },
  { label: "Saída", value: "OUT" },
];

interface IEditCreateTransactionModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshData: () => void;
  data?: ITransaction;
  creation?: boolean;
}

const EditCreateTransactionModal: React.FC<IEditCreateTransactionModal> = ({
  isOpen,
  setIsOpen,
  refreshData,
  data,
  creation,
}) => {
  const [formValues, setFormValues] = useState<INewTransaction | any>(data);
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(
    Boolean(creation)
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormValues({
      ...data,
      kind: KIND_OPTIONS.find((option) => option.value === data?.kind),
    });
  }, [data]);

  const formattedFormValues = () => {
    const withDateFormatted = {
      ...formValues,
      value: parseFloat(formValues.value),
      date: formValues.date.substring(0, 10),
      canceledAt: formValues.canceledAt?.substring(0, 10),
      recurrent: Boolean(formValues.recurrent),
      kind: formValues.kind.value,
    };
    return cleanEmptyEntries(withDateFormatted);
  };

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
      createTransaction(formattedFormValues() as INewTransaction)
        .then(() => {
          handleSuccess();
        })
        .catch(() => {
          handleError();
        });
    } else {
      data &&
        updateTransaction(formattedFormValues() as INewTransaction, data?.id)
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
      title={creation ? "Nova transação" : "Editar transação"}
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
            <FormField label="Valor" name="value" required>
              <TextInput name="value" type="number" placeholder="10,00" />
            </FormField>
            <FormField label="Tipo" name="kind" required>
              <Select
                name="kind"
                placeholder="Entrada"
                options={KIND_OPTIONS}
                labelKey="label"
                valueKey="value"
              />
            </FormField>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Origem" name="origin" required>
              <TextInput name="origin" placeholder="Contas" />
            </FormField>
            <FormField label="Data" name="date" required>
              <DateInput
                name="date"
                format="dd/mm/yyyy"
                placeholder="dd/mm/aaaa"
              />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
        <FormField label="Descrição" name="description">
          <TextInput name="description" placeholder="Descrição legal" />
        </FormField>
        <TupleFieldContainer>
          <HalfFieldContainer>
            <CheckboxContainer>
              <FormField
                name="recurrent"
                contentProps={{ border: { style: "hidden" } }}
              >
                <CheckBox name="recurrent" label="Ocorre todo mês?" />
              </FormField>
            </CheckboxContainer>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Recorrência finalizada em:" name="canceledAt">
              <DateInput
                name="canceledAt"
                format="dd/mm/yyyy"
                placeholder="dd/mm/aaaa"
              />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
      </Form>
    </Modal>
  );
};

export default EditCreateTransactionModal;
