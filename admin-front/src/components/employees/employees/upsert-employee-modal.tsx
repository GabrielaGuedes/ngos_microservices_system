import { Form, FormField, TextInput, DateInput, Select } from "grommet";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAreas } from "../../../requests/employees/get-areas";
import { getTeams } from "../../../requests/employees/get-teams";
import { IEmployee, INewEmployee } from "../../../requests/employees/types";
import Modal from "../../../ui-components/modal/modal";
import { errorToast } from "../../../ui-components/toasts/toasts";
import {
  TupleFieldContainer,
  HalfFieldContainer,
} from "../../../ui-components/base-containers/base-containers";
import { updateEmployee } from "../../../requests/employees/update-employee";
import { createEmployee } from "../../../requests/employees/create-employee";

interface IUpsertEmployeeModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  refreshTable?: () => void;
  data?: IEmployee;
  creation?: boolean;
}

interface IOption {
  label: string;
  value: string | number;
}

const UpsertEmployeeModal: React.FC<IUpsertEmployeeModal> = ({
  isOpen,
  setIsOpen,
  refreshTable,
  data,
  creation,
}) => {
  const [formValues, setFormValues] = useState<INewEmployee | any>();
  const [areaOptions, setAreaOptions] = useState<IOption[]>([]);
  const [teamOptions, setTeamOptions] = useState<IOption[]>([]);

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
  }, []);

  const formattedFormValues = () => {
    return {
      ...formValues,
      areaIds: formValues.areas?.map((a: IOption) => a.value) || [],
      teamIds: formValues.teams?.map((t: IOption) => t.value) || [],
      phone: parseInt(formValues.phone),
    };
  };

  const handleConfirm = () => {
    if (creation) {
      createEmployee(formattedFormValues())
        .then(() => {
          refreshTable && refreshTable();
          setIsOpen(false);
        })
        .catch(() => errorToast());
    } else {
      data &&
        updateEmployee(formattedFormValues(), data?.id)
          .then(() => {
            refreshTable && refreshTable();
            setIsOpen(false);
          })
          .catch(() => errorToast());
    }
  };

  return (
    <Modal
      title={creation ? "Novo funcionário" : "Editar funcionário"}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      footer
      confirmLabel={creation ? "Criar" : "Editar"}
      onConfirm={handleConfirm}
    >
      <Form
        validate="blur"
        value={formValues}
        onChange={(nextValue) => setFormValues(nextValue)}
        messages={{ required: "Obrigatório" }}
      >
        <TupleFieldContainer>
          <HalfFieldContainer>
            <FormField label="Nome" name="name" required>
              <TextInput name="name" placeholder="João da Silva" />
            </FormField>
            <FormField label="Endereço" name="address" required>
              <TextInput name="address" placeholder="Rua Qualquer, 10" />
            </FormField>
            <FormField label="Estado (UF)" name="state" required>
              <TextInput name="state" placeholder="SP" />
            </FormField>
            <FormField label="Celular" name="phone" required>
              <TextInput
                name="phone"
                placeholder="5511987654321"
                type="number"
              />
            </FormField>
            <FormField label="Data de nascimento" name="birthDate" required>
              <DateInput name="birthDate" format="mm/dd/yyyy" />
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
            <FormField label="Cargo" name="occupation" required>
              <TextInput name="occupation" placeholder="Desenvolvedora" />
            </FormField>
            <FormField label="Data de admissão" name="hireDate" required>
              <DateInput name="hireDate" format="mm/dd/yyyy" />
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

export default UpsertEmployeeModal;
