import { DateInput, FormField } from "grommet";
import React, { Fragment } from "react";
import {
  HalfFieldContainer,
  TupleFieldContainer,
} from "../../ui-components/base-containers/base-containers";

interface IFiltersFormFields {}

const FiltersFormFields: React.FC<IFiltersFormFields> = () => {
  return (
    <Fragment>
      <TupleFieldContainer>
        <HalfFieldContainer>
          <FormField label="Data de doação mínima" name="minDate">
            <DateInput
              name="minDate"
              format="dd/mm/yyyy"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
        </HalfFieldContainer>
        <HalfFieldContainer>
          <FormField label="Data de doação máxima" name="maxDate">
            <DateInput
              name="maxDate"
              format="dd/mm/yyyy"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
        </HalfFieldContainer>
      </TupleFieldContainer>
    </Fragment>
  );
};

export default FiltersFormFields;
