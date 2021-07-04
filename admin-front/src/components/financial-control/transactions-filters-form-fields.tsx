import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { FormField, Select, TextInput, CheckBox } from "grommet";
import { IOption } from "../../ui-components/select/types";
import { getOrigins } from "../../requests/financial-control/get-origins";
import {
  TupleFieldContainer,
  HalfFieldContainer,
} from "../../ui-components/base-containers/base-containers";

interface ITransactionsFiltersFormFields {}

const TransactionsFiltersFormFields: React.FC<ITransactionsFiltersFormFields> =
  () => {
    const [originOptions, setOriginOptions] = useState<IOption[]>([]);

    useEffect(() => {
      getOrigins().then((res) =>
        setOriginOptions(
          res.map((origin, index) => ({
            label: origin,
            value: `${origin}-${index}`,
          }))
        )
      );
    }, []);

    return (
      <Fragment>
        <TupleFieldContainer>
          <HalfFieldContainer>
            <FormField label="Valor mínimo" name="minValue">
              <TextInput name="minValue" placeholder="0,00" type="number" />
            </FormField>
          </HalfFieldContainer>
          <HalfFieldContainer>
            <FormField label="Valor máximo" name="maxValue">
              <TextInput name="maxValue" placeholder="0,00" type="number" />
            </FormField>
          </HalfFieldContainer>
        </TupleFieldContainer>
        <FormField label="Origem" name="origin">
          <Select
            clear
            name="origin"
            placeholder="Doação"
            options={originOptions}
            labelKey="label"
            valueKey="value"
          />
        </FormField>
        <FormField
          name="showCanceled"
          contentProps={{ border: { style: "hidden" } }}
        >
          <CheckBox
            name="showCanceled"
            label="Mostrar transações canceladas?"
          />
        </FormField>
        <FormField
          name="recurrent"
          contentProps={{ border: { style: "hidden" } }}
        >
          <CheckBox name="recurrent" label="Mostrar apenas recorrentes?" />
        </FormField>
      </Fragment>
    );
  };

export default TransactionsFiltersFormFields;
