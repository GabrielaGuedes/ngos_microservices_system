import React, { useState } from "react";
import { createGoal } from "../../requests/financial-control/create-goal";
import { INewGoal, IGoal } from "../../requests/financial-control/types";
import { updateGoal } from "../../requests/financial-control/update-goal";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../ui-components/toasts/toasts";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";
import Modal from "../../ui-components/modal/modal";
import { Form, FormField, DateInput, TextInput } from "grommet";
import {
  TupleFieldContainer,
  HalfFieldContainer,
} from "../../ui-components/base-containers/base-containers";

interface IEditCreateGoalModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshData: () => void;
  data?: IGoal;
  creation?: boolean;
}

const EditCreateGoalModal: React.FC<IEditCreateGoalModal> = ({
  isOpen,
  setIsOpen,
  refreshData,
  data,
  creation,
}) => {
  const [formValues, setFormValues] = useState<INewGoal | any>(data);
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(
    Boolean(creation)
  );
  const [loading, setLoading] = useState<boolean>(false);

  const formattedFormValues = () => {
    const withDateFormatted = {
      ...formValues,
      goalValue: formValues.goalValue && parseFloat(formValues.goalValue),
      currentValue: formValues.goalValue && parseFloat(formValues.currentValue),
      deadline: formValues.deadline?.substring(0, 10),
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
      createGoal(formattedFormValues() as INewGoal)
        .then(() => {
          handleSuccess();
        })
        .catch(() => {
          handleError();
        });
    } else {
      data &&
        updateGoal(formattedFormValues() as INewGoal, data?.id)
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
      title={creation ? "Nova meta" : "Editar meta"}
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
            <FormField label="Valor da meta" name="goalValue" required>
              <TextInput name="goalValue" type="number" placeholder="100,00" />
            </FormField>
            <FormField label="Valor já alcançado" name="currentValue" required>
              <TextInput
                name="currentValue"
                type="number"
                placeholder="50,00"
              />
            </FormField>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Deadline" name="deadline" required>
              <DateInput
                name="deadline"
                format="dd/mm/yyyy"
                placeholder="dd/mm/aaaa"
              />
            </FormField>
            <FormField label="Descrição" name="description">
              <TextInput name="description" placeholder="Descrição legal" />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
      </Form>
    </Modal>
  );
};

export default EditCreateGoalModal;
