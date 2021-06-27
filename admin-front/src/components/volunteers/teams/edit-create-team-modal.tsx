import React, { useEffect, useState } from "react";
import { createTeam } from "../../../requests/volunteers/create-team";
import { getVolunteers } from "../../../requests/volunteers/get-volunteers";
import {
  IVolunteerTeam,
  INewVolunteerTeam,
} from "../../../requests/volunteers/types";
import { updateTeam } from "../../../requests/volunteers/update-team";
import { IOption } from "../../../ui-components/select/types";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../../ui-components/toasts/toasts";
import Modal from "../../../ui-components/modal/modal";
import { Form, FormField, TextInput, Select } from "grommet";

interface IEditCreateTeamModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshTable: () => void;
  data?: IVolunteerTeam;
  creation?: boolean;
}

const EditCreateTeamModal: React.FC<IEditCreateTeamModal> = ({
  isOpen,
  setIsOpen,
  refreshTable,
  data,
  creation,
}) => {
  const [formValues, setFormValues] = useState<INewVolunteerTeam | any>();
  const [volunteerOptions, setVolunteerOptions] = useState<IOption[]>([]);
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(
    Boolean(creation)
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormValues({
      ...data,
      volunteers:
        data?.volunteers.map((a) => ({ value: a.id, label: a.name })) || [],
    });
    getVolunteers()
      .then((result) => {
        setVolunteerOptions(
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
      volunteerIds: formValues.volunteers?.map((a: IOption) => a.value) || [],
      additionalInfo: formValues.additionalInfo || "",
    };
  };

  const sendRequest = () => {
    return creation
      ? createTeam(formattedFormValues())
      : updateTeam(formattedFormValues(), data?.id as any);
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
      title={creation ? "Nova time" : "Editar time"}
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
          <TextInput name="name" placeholder="Time legal" />
        </FormField>
        <FormField label="Descrição" name="description">
          <TextInput name="description" placeholder="Bla bla bla" />
        </FormField>
        <FormField label="Voluntários" name="volunteers">
          <Select
            name="volunteers"
            placeholder="João"
            options={volunteerOptions}
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

export default EditCreateTeamModal;
