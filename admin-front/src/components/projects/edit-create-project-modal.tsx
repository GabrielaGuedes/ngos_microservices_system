import React, { useState } from "react";
import { createProject } from "../../requests/projects/create-project";
import { INewProject, IProject } from "../../requests/projects/types";
import { updateProject } from "../../requests/projects/update-project";
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
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";

interface IEditCreateProjectModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshData: () => Promise<any>;
  data?: IProject;
  creation?: boolean;
}

const EditCreateProjectModal: React.FC<IEditCreateProjectModal> = ({
  isOpen,
  setIsOpen,
  refreshData,
  data,
  creation,
}) => {
  const [formValues, setFormValues] = useState<INewProject | any>(data);
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(
    Boolean(creation)
  );
  const [loading, setLoading] = useState<boolean>(false);

  const formattedFormValues = () => {
    const withDateFormatted = {
      ...formValues,
      startDate: formValues.startDate.substring(0, 10),
      endDate: formValues.endDate?.substring(0, 10),
      incomeDate: formValues.incomeDate?.substring(0, 10),
      costDate: formValues.costDate?.substring(0, 10),
      expectedCost: formValues.expectedCost
        ? parseFloat(formValues.expectedCost)
        : null,
      expectedIncome: formValues.expectedIncome
        ? parseFloat(formValues.expectedIncome)
        : null,
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
      console.log(formattedFormValues());
      createProject(formattedFormValues() as INewProject)
        .then(() => {
          handleSuccess();
        })
        .catch(() => {
          handleError();
        });
    } else {
      data &&
        updateProject(formattedFormValues() as INewProject, data?.id)
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
      title={creation ? "Novo projeto" : "Editar projeto"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer
      confirmLabel={creation ? "Criar" : "Editar"}
      onConfirm={handleConfirm}
      confirmDisabled={formIsInvalid || loading}
    >
      <Form
        validate="blur"
        value={formValues}
        onChange={(nextValue) => setFormValues(nextValue)}
        onValidate={(event) => {
          setFormIsInvalid(!event.valid);
        }}
        messages={{ required: "Obrigatório" }}
      >
        <FormField label="Nome" name="name" required>
          <TextInput name="name" placeholder="Super evento de arrecadação" />
        </FormField>
        <TupleFieldContainer>
          <HalfFieldContainer>
            <FormField label="Data inicial" name="startDate" required>
              <DateInput
                name="startDate"
                format="dd/mm/yyyy"
                placeholder="dd/mm/aaaa"
              />
            </FormField>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Data de fim" name="endDate">
              <DateInput
                name="endDate"
                format="dd/mm/yyyy"
                placeholder="dd/mm/aaaa"
              />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
        <TupleFieldContainer>
          <HalfFieldContainer>
            <FormField label="Data de pagamento" name="costDate">
              <DateInput
                name="costDate"
                format="dd/mm/yyyy"
                placeholder="dd/mm/aaaa"
              />
            </FormField>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Data de entrada da receita" name="incomeDate">
              <DateInput
                name="incomeDate"
                format="dd/mm/yyyy"
                placeholder="dd/mm/aaaa"
              />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
        <TupleFieldContainer>
          <HalfFieldContainer>
            <FormField label="Receita esperada" name="expectedIncome">
              <TextInput
                name="expectedIncome"
                placeholder="0,00"
                type="number"
              />
            </FormField>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Custo esperado" name="expectedCost">
              <TextInput name="expectedCost" placeholder="0,00" type="number" />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
        <FormField label="Descrição" name="description">
          <TextInput
            name="description"
            placeholder="Descrição para o projeto bacana"
          />
        </FormField>
        <FormField label="Público alvo" name="target">
          <TextInput name="target" placeholder="Idosos (que gostam de bingo)" />
        </FormField>
        <TupleFieldContainer>
          <HalfFieldContainer>
            <FormField label="Área responsável" name="responsibleArea">
              <TextInput name="responsibleArea" placeholder="Área legal" />
            </FormField>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Time responsável" name="responsibleTeam">
              <TextInput name="responsibleTeam" placeholder="Time top" />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
      </Form>
    </Modal>
  );
};

export default EditCreateProjectModal;
