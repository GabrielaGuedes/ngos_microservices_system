import React from "react";
import { Fragment } from "react";
import {
  ValuesContainer,
  ValueFieldContainer,
} from "./filters-form-fields.style";
import { FormField, TextInput, RadioButtonGroup } from "grommet";

interface IFiltersFormFields {}

const FiltersFormFields: React.FC<IFiltersFormFields> = () => {
  return (
    <Fragment>
      <ValuesContainer>
        <ValueFieldContainer>
          <FormField label="Valor mínimo" name="minValue">
            <TextInput name="minValue" type="number" placeholder="0,00" />
          </FormField>
        </ValueFieldContainer>
        <ValueFieldContainer>
          <FormField label="Valor máximo" name="maxValue">
            <TextInput name="maxValue" type="number" placeholder="100,00" />
          </FormField>
        </ValueFieldContainer>
      </ValuesContainer>
      <FormField label="Cidade" name="city">
        <TextInput name="city" placeholder="São Paulo" />
      </FormField>
      <FormField label="Estado (UF)" name="state">
        <TextInput name="state" placeholder="SP" />
      </FormField>
      <FormField label="País" name="country">
        <TextInput name="country" placeholder="Brasil" />
      </FormField>
      <FormField name="sortBy" label="Ordernar por">
        <RadioButtonGroup
          name="sortBy"
          options={[
            {
              value: "name",
              label: "Nome",
            },
            {
              value: "donatedValue",
              label: "Valor doado",
            },
            {
              value: "updatedAt",
              label: "Data da última doação",
            },
            {
              value: "birthDate",
              label: "Data de aniversário",
            },
            {
              value: "occupation",
              label: "Profissão",
            },
            {
              value: "motivation",
              label: "Motivação",
            },
            {
              value: "city",
              label: "Cidade",
            },
            {
              value: "state",
              label: "Estado",
            },
            {
              value: "country",
              label: "País",
            },
            {
              value: "email",
              label: "Email",
            },
            {
              value: "phone",
              label: "Telefone",
            },
          ]}
        />
      </FormField>
    </Fragment>
  );
};

export default FiltersFormFields;
