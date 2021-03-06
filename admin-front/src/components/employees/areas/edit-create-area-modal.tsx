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
  }, [data]);

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
      "Ops, aconteceu algo de errado. Cheque os dados informados e certifique-se que o email j?? n??o foi cadastrado."
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
      title={creation ? "Nova ??rea" : "Editar ??rea"}
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
        messages={{ required: "Obrigat??rio" }}
      >
        <FormField label="Nome" name="name" required>
          <TextInput name="name" placeholder="??rea legal" />
        </FormField>
        <FormField label="Descri????o" name="description">
          <TextInput name="description" placeholder="Bla bla bla" />
        </FormField>
        <FormField label="Funcion??rios" name="employees">
          <Select
            name="employees"
            placeholder="Jo??o"
            options={employeeOptions}
            labelKey="label"
            valueKey="value"
            multiple
            messages={{ multiple: "V??rios itens" }}
            closeOnChange={false}
          />
        </FormField>
      </Form>
    </Modal>
  );
};

export default EditCreateAreaModal;
