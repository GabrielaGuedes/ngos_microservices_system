import React, { useEffect, useState } from "react";
import { createArea } from "../../../requests/employees/create-area";
import { getEmployees } from "../../../requests/employees/get-employees";
import {
  IEmployeeArea,
  INewEmployeeArea,
} from "../../../requests/employees/types";
import { updateArea } from "../../../requests/employees/update-area";
import { IOption } from "../../../ui-components/select/types";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../../ui-components/toasts/toasts";
import Modal from "../../../ui-components/modal/modal";
import { Form, FormField, TextInput, Select } from "grommet";

interface IEditCreateAreaModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshTable: () => void;
  data?: IEmployeeArea;
  creation?: boolean;
}

const EditCreateAreaModal: React.FC<IEditCreateAreaModal> = ({
  isOpen,
  setIsOpen,
  refreshTable,
  data,
  creation,
}) => {
  const [formValues, setFormValues] = useState<INewEmployeeArea | any>();
  const [employeeOptions, setEmployeeOptions] = useState<IOption[]>([]);
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(
    Boolean(creation)
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormValues({
      ...data,
      employees:
        data?.employees.map((a) => ({ value: a.id, label: a.name })) || [],
    });
    getEmployees()
      .then((result) => {
        setEmployeeOptions(
          result.map((team) => ({
            label: team.name,
            value: team.id,
          }))
        );
      })
      .catch(() => errorToast());
  }, []);

  const formattedFormValues = () => {
    return {
      ...formValues,
      employeeIds: formValues.employees?.map((a: IOption) => a.value) || [],
      additionalInfo: formValues.additionalInfo || "",
    };
  };

  const sendRequest = () => {
    return creation
      ? createArea(formattedFormValues())
      : updateArea(formattedFormValues(), data?.id as any);
  };

  const handleSuccess = () => {
    refreshTable();
    creation && setFormValues({});
    setLoading(false);
    successToast();
    setIsOpen(false);
  };

  const handleError = () => {
    errorToast(
      "Ops, aconteceu algo de errado. Cheque os dados informados e certifique-se que o email já não foi cadastrado."
    );
    setLoading(false);
    setFormIsInvalid(false);
  };

  const handleConfirm = () => {
    setLoading(true);
    loadingToast();
    sendRequest()
      .then(() => {
        handleSuccess();
      })
      .catch(() => {
        handleError();
      });
  };

  return (
    <Modal
      title={creation ? "Nova área" : "Editar área"}
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
        <FormField label="Nome" name="name" required>
          <TextInput name="name" placeholder="Área legal" />
        </FormField>
        <FormField label="Descrição" name="description">
          <TextInput name="description" placeholder="Bla bla bla" />
        </FormField>
        <FormField label="Funcionários" name="employees">
          <Select
            name="employees"
            placeholder="João"
            options={employeeOptions}
            labelKey="label"
            valueKey="value"
            multiple
            messages={{ multiple: "Vários itens" }}
            closeOnChange={false}
          />
        </FormField>
      </Form>
    </Modal>
  );
};

export default EditCreateAreaModal;
