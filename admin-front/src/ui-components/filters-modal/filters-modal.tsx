import { Form } from "grommet";
import React, { ReactNode, useState } from "react";
import Modal from "../modal/modal";

interface IFiltersModal {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  filters: any;
  setFilters: (value: any) => void;
  filtersFormFields: ReactNode;
  handleConfirmForm: (values: any) => Promise<any>;
}

const FiltersModal: React.FC<IFiltersModal> = ({
  isOpen,
  setIsOpen,
  filters,
  setFilters,
  filtersFormFields,
  handleConfirmForm,
}) => {
  const [formValues, setFormValues] = useState<any>(filters);

  const handleConfirm = () => {
    handleConfirmForm(formValues).then((formattedResult) => {
      setFilters(formattedResult);
      setIsOpen(false);
    });
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
        {filtersFormFields}
      </Form>
    </Modal>
  );
};

export default FiltersModal;
