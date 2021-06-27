import React, { useState } from "react";
import { getVolunteers } from "../../../requests/volunteers/get-volunteers";
import {
  IVolunteer,
  IVolunteersFilters,
} from "../../../requests/volunteers/types";
import { errorToast } from "../../../ui-components/toasts/toasts";
import Modal from "../../../ui-components/modal/modal";
import { Form, FormField, Select, TextInput } from "grommet";
import { IOption } from "../../../ui-components/select/types";
import { useEffect } from "react";
import { getAreas } from "../../../requests/volunteers/get-areas";
import { getTeams } from "../../../requests/volunteers/get-teams";

interface IFiltersModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setVolunteers: (value: IVolunteer[]) => void;
  filters: IVolunteersFilters;
  setFilters: (value: IVolunteersFilters) => void;
}

interface IVolunteersFiltersForm extends IVolunteersFilters {
  team?: IOption;
  area?: IOption;
}

const FiltersModal: React.FC<IFiltersModal> = ({
  isOpen,
  setIsOpen,
  setVolunteers,
  filters,
  setFilters,
}) => {
  const [formValues, setFormValues] = useState<IVolunteersFiltersForm>(filters);
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

  const cleanEmptyFilters = (formattedValues: IVolunteersFilters) => {
    const filtersInArray = Object.entries(formattedValues).filter(
      (entry) => entry[1] !== "" && entry[1] !== undefined
    );
    return Object.fromEntries(filtersInArray);
  };

  const handleConfirm = () => {
    const formattedValues = formatFormValues();
    const cleanedFilters = cleanEmptyFilters(formattedValues as any);

    getVolunteers(cleanedFilters)
      .then((res) => {
        setFilters(cleanedFilters);
        setVolunteers(res);
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
