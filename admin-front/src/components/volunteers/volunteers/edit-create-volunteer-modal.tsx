import {
  Form,
  FormField,
  TextInput,
  DateInput,
  Select,
  MaskedInput,
} from "grommet";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAreas } from "../../../requests/volunteers/get-areas";
import { getTeams } from "../../../requests/volunteers/get-teams";
import { IVolunteer, INewVolunteer } from "../../../requests/volunteers/types";
import Modal from "../../../ui-components/modal/modal";
import {
  errorToast,
  loadingToast,
  successToast,
} from "../../../ui-components/toasts/toasts";
import {
  TupleFieldContainer,
  HalfFieldContainer,
} from "../../../ui-components/base-containers/base-containers";
import { updateVolunteer } from "../../../requests/volunteers/update-volunteer";
import { createVolunteer } from "../../../requests/volunteers/create-volunteer";
import { IOption } from "../../../ui-components/select/types";

interface IEditCreateVolunteerModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshTable: () => void;
  data?: IVolunteer;
  creation?: boolean;
}

const EditCreateVolunteerModal: React.FC<IEditCreateVolunteerModal> = ({
  isOpen,
  setIsOpen,
  refreshTable,
  data,
  creation,
}) => {
  const [formValues, setFormValues] = useState<INewVolunteer | any>();
  const [areaOptions, setAreaOptions] = useState<IOption[]>([]);
  const [teamOptions, setTeamOptions] = useState<IOption[]>([]);
  const [formIsInvalid, setFormIsInvalid] = useState<boolean>(
    Boolean(creation)
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormValues({
      ...data,
      areas: data?.areas.map((a) => ({ value: a.id, label: a.name })) || [],
      teams: data?.teams.map((t) => ({ value: t.id, label: t.name })) || [],
    });
    getAreas()
      .then((result) => {
        setAreaOptions(
          result.map((area) => ({
            label: area.name,
            value: area.id,
          }))
        );
      })
      .catch(() => errorToast());
    getTeams()
      .then((result) => {
        setTeamOptions(
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
      areaIds: formValues.areas?.map((a: IOption) => a.value) || [],
      teamIds: formValues.teams?.map((t: IOption) => t.value) || [],
      phone: parseInt(formValues.phone.replace(/\D/g, "")),
      birthDate: formValues.birthDate.substring(0, 10),
      state: formValues.state.toUpperCase(),
      additionalInfo: formValues.additionalInfo || "",
    };
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
    if (creation) {
      createVolunteer(formattedFormValues())
        .then(() => {
          handleSuccess();
        })
        .catch(() => {
          handleError();
        });
    } else {
      data &&
        updateVolunteer(formattedFormValues(), data?.id)
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
      title={creation ? "Novo voluntário" : "Editar voluntário"}
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
        <TupleFieldContainer>
          <HalfFieldContainer>
            <FormField label="Nome" name="name" required>
              <TextInput name="name" placeholder="João da Silva" />
            </FormField>
            <FormField label="Endereço" name="address">
              <TextInput name="address" placeholder="Rua Qualquer, 10" />
            </FormField>
            <FormField label="Estado (UF)" name="state" required>
              <MaskedInput
                mask={[
                  {
                    length: 2,
                    regexp: /^[A-Za-z]{1,2}$/,
                    placeholder: "SP",
                  },
                ]}
                name="state"
              />
            </FormField>
            <FormField label="Celular" name="phone" required>
              <MaskedInput
                mask={[
                  { fixed: "+" },
                  {
                    length: 2,
                    regexp: /^[0-9]{1,2}$/,
                    placeholder: "xx",
                  },
                  { fixed: " " },
                  { fixed: "(" },
                  {
                    length: 2,
                    regexp: /^[0-9]{1,2}$/,
                    placeholder: "xx",
                  },
                  { fixed: ")" },
                  { fixed: " " },
                  {
                    length: 5,
                    regexp: /^[0-9]{1,5}$/,
                    placeholder: "xxxxx",
                  },
                  { fixed: "-" },
                  {
                    length: 4,
                    regexp: /^[0-9]{1,4}$/,
                    placeholder: "xxxx",
                  },
                ]}
                name="phone"
              />
            </FormField>
            <FormField label="Data de nascimento" name="birthDate" required>
              <DateInput
                name="birthDate"
                format="dd/mm/yyyy"
                placeholder="dd/mm/aaaa"
              />
            </FormField>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Email" name="email" required>
              <TextInput
                name="email"
                placeholder="email@mail.com"
                type="email"
              />
            </FormField>
            <FormField label="Cidade" name="city" required>
              <TextInput name="city" placeholder="São Paulo" />
            </FormField>
            <FormField label="Country" name="country" required>
              <TextInput name="country" placeholder="Brasil" />
            </FormField>
            <FormField label="Times" name="teams">
              <Select
                name="teams"
                placeholder="Time legal"
                options={teamOptions}
                labelKey="label"
                valueKey="value"
                multiple
                messages={{ multiple: "Vários itens" }}
                closeOnChange={false}
              />
            </FormField>
            <FormField label="Áreas" name="areas">
              <Select
                name="areas"
                placeholder="Área legal"
                options={areaOptions}
                labelKey="label"
                valueKey="value"
                multiple
                messages={{ multiple: "Vários itens" }}
                closeOnChange={false}
              />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
        <FormField label="Informação adicional" name="additionalInfo">
          <TextInput name="additionalInfo" placeholder="Bla bla bla" />
        </FormField>
      </Form>
    </Modal>
  );
};

export default EditCreateVolunteerModal;
