import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { FormField, Select, TextInput } from "grommet";
import { IOption } from "../../../ui-components/select/types";
import { getAreas } from "../../../requests/employees/get-areas";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { getTeams } from "../../../requests/employees/get-teams";
import { IEmployeesFilters } from "../../../requests/employees/types";

export interface IEmployeesFiltersForm extends IEmployeesFilters {
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
    </Fragment>
  );
};

export default FiltersFormFields;
