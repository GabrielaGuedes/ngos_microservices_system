import React from "react";
import { Fragment } from "react";
import { FormField, DateInput, TextInput } from "grommet";
import {
  TupleFieldContainer,
  HalfFieldContainer,
} from "../../ui-components/base-containers/base-containers";

interface IFiltersFormFields {}

const FiltersFormFields: React.FC<IFiltersFormFields> = () => {
  return (
    <Fragment>
      <TupleFieldContainer>
        <HalfFieldContainer>
          <FormField label="Data inicial mínima" name="minStartDate">
            <DateInput
              name="minStartDate"
              format="dd/mm/yyyy"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
        </HalfFieldContainer>
        <HalfFieldContainer>
          <FormField label="Data inicial máxima" name="maxStartDate">
            <DateInput
              name="maxStartDate"
              format="dd/mm/yyyy"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
        </HalfFieldContainer>
      </TupleFieldContainer>
      <TupleFieldContainer>
        <HalfFieldContainer>
          <FormField label="Data de custo mínima" name="minCostDate">
            <DateInput
              name="minCostDate"
              format="dd/mm/yyyy"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
        </HalfFieldContainer>
        <HalfFieldContainer>
          <FormField label="Data de custo máxima" name="maxCostDate">
            <DateInput
              name="maxCostDate"
              format="dd/mm/yyyy"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
        </HalfFieldContainer>
      </TupleFieldContainer>
      <TupleFieldContainer>
        <HalfFieldContainer>
          <FormField
            label="Data de entrada da receita mínima"
            name="minIncomeDate"
          >
            <DateInput
              name="minIncomeDate"
              format="dd/mm/yyyy"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
        </HalfFieldContainer>
        <HalfFieldContainer>
          <FormField
            label="Data de entrada da receita máxima"
            name="maxIncomeDate"
          >
            <DateInput
              name="maxIncomeDate"
              format="dd/mm/yyyy"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
        </HalfFieldContainer>
      </TupleFieldContainer>
      <TupleFieldContainer>
        <HalfFieldContainer>
          <FormField label="Receita mínima esperada" name="minIncome">
            <TextInput name="minIncome" placeholder="0,00" type="number" />
          </FormField>
        </HalfFieldContainer>
        <HalfFieldContainer>
          <FormField label="Custo máximo esperado" name="maxCost">
            <TextInput name="maxCost" placeholder="0,00" type="number" />
          </FormField>
        </HalfFieldContainer>
      </TupleFieldContainer>
    </Fragment>
  );
};

export default FiltersFormFields;
