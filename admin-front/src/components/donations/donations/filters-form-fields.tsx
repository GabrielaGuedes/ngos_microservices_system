import React from "react";
import { Fragment } from "react";
import {
  ValuesContainer,
  ValueFieldContainer,
} from "./filters-form-fields.style";
import { FormField, TextInput, CheckBox, RadioButtonGroup } from "grommet";

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
      <FormField name="sortBy" label="Ordernar por">
        <RadioButtonGroup
          name="sortBy"
          options={[
            {
              value: "status",
              label: "Status",
            },
            {
              value: "createdAt",
              label: "Data",
            },
            {
              value: "amount",
              label: "Valor",
            },
            {
              value: "donatorEmail",
              label: "Doador",
            },
            {
              value: "source",
              label: "Meio de pagamento",
            },
          ]}
        />
      </FormField>
      <FormField name="paid" contentProps={{ border: { style: "hidden" } }}>
        <CheckBox name="paid" label="Mostrar apenas pagas?" />
      </FormField>
    </Fragment>
  );
};

export default FiltersFormFields;
