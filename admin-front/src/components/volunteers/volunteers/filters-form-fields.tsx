import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { FormField, Select, TextInput } from "grommet";
import { IOption } from "../../../ui-components/select/types";
import { getAreas } from "../../../requests/volunteers/get-areas";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { getTeams } from "../../../requests/volunteers/get-teams";
import { IVolunteersFilters } from "../../../requests/volunteers/types";

export interface IVolunteersFiltersForm extends IVolunteersFilters {
  team?: IOption;
  area?: IOption;
}

interface IFiltersFormFields {}

const FiltersFormFields: React.FC<IFiltersFormFields> = () => {
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

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default FiltersFormFields;
