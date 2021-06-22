import React, { useState } from "react";
import { getEmployees } from "../../../requests/employees/get-employees";
import {
  IEmployee,
  IEmployeesFilters,
} from "../../../requests/employees/types";
import { errorToast } from "../../../ui-components/toasts/toasts";
import Modal from "../../../ui-components/modal/modal";
import { Form, FormField, Select, TextInput } from "grommet";
import { IOption } from "../../../ui-components/select/types";
import { useEffect } from "react";
import { getAreas } from "../../../requests/employees/get-areas";
import { getTeams } from "../../../requests/employees/get-teams";

interface IFiltersModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setEmployees: (value: IEmployee[]) => void;
  filters: IEmployeesFilters;
  setFilters: (value: IEmployeesFilters) => void;
}

interface IEmployeesFiltersForm extends IEmployeesFilters {
  team?: IOption;
  area?: IOption;
}

const FiltersModal: React.FC<IFiltersModal> = ({
  isOpen,
  setIsOpen,
  setEmployees,
  filters,
  setFilters,
}) => {
  const [formValues, setFormValues] = useState<IEmployeesFiltersForm>(filters);
  const [areaOptions, setAreaOptions] = useState<IOption[]>([]);
  const [teamOptions, setTeamOptions] = useState<IOption[]>([]);

  useEffect(() => {
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

  const formatFormValues = () => {
    const formatted = {
      ...formValues,
      teamId: formValues.team?.value,
      areaId: formValues.area?.value,
    };
    delete formatted.area;
    delete formatted.team;
    return formatted;
  };

  const cleanEmptyFilters = (formattedValues: IEmployeesFilters) => {
    const filtersInArray = Object.entries(formattedValues).filter(
      (entry) => entry[1] !== "" && entry[1] !== undefined
    );
    return Object.fromEntries(filtersInArray);
  };

  const handleConfirm = () => {
    const formattedValues = formatFormValues();
    const cleanedFilters = cleanEmptyFilters(formattedValues as any);

    getEmployees(cleanedFilters)
      .then((res) => {
        setFilters(cleanedFilters);
        setEmployees(res);
        setIsOpen(false);
      })
      .catch(() => errorToast());
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Filtros"
      confirmLabel="Aplicar"
      footer
      onConfirm={handleConfirm}
      beforeClose={() => setFormValues(filters)}
    >
      <Form
        validate="blur"
        value={formValues}
        onChange={(nextValue) => setFormValues(nextValue)}
      >
        <FormField label="Cargo" name="occupation">
          <TextInput name="occupation" placeholder="Desenvolvedora" />
        </FormField>
        <FormField label="Cidade" name="city">
          <TextInput name="city" placeholder="São Paulo" />
        </FormField>
        <FormField label="Estado (UF)" name="state">
          <TextInput name="state" placeholder="SP" />
        </FormField>
        <FormField label="Time" name="team">
          <Select
            clear
            name="team"
            placeholder="Time legal"
            options={teamOptions}
            labelKey="label"
            valueKey="value"
          />
        </FormField>
        <FormField label="Área" name="area">
          <Select
            clear
            name="area"
            placeholder="Área legal"
            options={areaOptions}
            labelKey="label"
            valueKey="value"
          />
        </FormField>
      </Form>
    </Modal>
  );
};

export default FiltersModal;
