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
          <FormField label="Data de postagem mínima" name="minPostedAt">
            <DateInput
              name="minPostedAt"
              format="dd/mm/yyyy"
              placeholder="dd/mm/aaaa"
            />
          </FormField>
        </HalfFieldContainer>
        <HalfFieldContainer>
          <FormField label="Data de postagem máxima" name="maxPostedAt">
            <DateInput
              name="maxPostedAt"
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
