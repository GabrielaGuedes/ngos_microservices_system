import {
  Form,
  FormField,
  TextInput,
  CheckBox,
  RadioButtonGroup,
} from "grommet";
import React, { useState } from "react";
import { getDonations } from "../../../requests/donations/get-donations";
import {
  IDonations,
  IDonationsFilters,
} from "../../../requests/donations/types";
import { errorToast } from "../../../ui-components/toasts/toasts";
import { ValuesContainer, ValueFieldContainer } from "./filters-modal.style";
import Modal from "../../../ui-components/modal/modal";

interface IFiltersModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setDonations: (value: IDonations) => void;
  filters: IDonationsFilters;
  setFilters: (value: IDonationsFilters) => void;
}

const FiltersModal: React.FC<IFiltersModal> = ({
  isOpen,
  setIsOpen,
  setDonations,
  filters,
  setFilters,
}) => {
  const [formValues, setFormValues] = useState<IDonationsFilters>(filters);

  const cleanEmptyFilters = (nextFilters: IDonationsFilters) => {
    const filtersInArray = Object.entries(nextFilters).filter(
      (entry) => entry[1] !== false && entry[1] !== ""
    );
    return Object.fromEntries(filtersInArray);
  };

  const handleConfirm = () => {
    const cleanedFilters = cleanEmptyFilters(formValues);

    getDonations(cleanedFilters)
      .then((res) => {
        setFilters(cleanedFilters);
        setDonations(res);
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
      </Form>
    </Modal>
  );
};

export default FiltersModal;