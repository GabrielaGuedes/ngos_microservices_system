import { Form, FormField, TextInput, RadioButtonGroup } from "grommet";
import React, { useState } from "react";
import { getDonators } from "../../../requests/donations/get-donators";
import { IDonator, IDonatorsFilters } from "../../../requests/donations/types";
import Modal from "../../../ui-components/modal/modal";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { ValuesContainer, ValueFieldContainer } from "./filters-modal.style";

interface IFiltersModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setDonators: (value: IDonator[]) => void;
  filters: IDonatorsFilters;
  setFilters: (value: IDonatorsFilters) => void;
}

const FiltersModal: React.FC<IFiltersModal> = ({
  isOpen,
  setIsOpen,
  setDonators,
  filters,
  setFilters,
}) => {
  const [formValues, setFormValues] = useState<IDonatorsFilters>(filters);

  const cleanEmptyFilters = (nextFilters: IDonatorsFilters) => {
    const filtersInArray = Object.entries(nextFilters).filter(
      (entry) => entry[1] !== ""
    );
    return Object.fromEntries(filtersInArray);
  };

  const handleConfirm = () => {
    const cleanedFilters = cleanEmptyFilters(formValues);

    getDonators(cleanedFilters)
      .then((res) => {
        setFilters(cleanedFilters);
        setDonators(res);
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
      </Form>
    </Modal>
  );
};

export default FiltersModal;
