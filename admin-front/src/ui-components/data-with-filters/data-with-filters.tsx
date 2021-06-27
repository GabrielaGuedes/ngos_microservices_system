import React, { ReactNode, useState } from "react";
import { Fragment } from "react";
import Button from "../button/button";
import { InfoContainer } from "./data-with-filters.style";
import FiltersModal from "../filters-modal/filters-modal";

interface IDataWithFilters {
  filtersFormFields: ReactNode;
  dataContainer: ReactNode;
  handleConfirmForm: (values: any) => Promise<any>;
  topRightInfo?: ReactNode;
}

const DataWithFilters: React.FC<IDataWithFilters> = ({
  filtersFormFields,
  dataContainer,
  handleConfirmForm,
  topRightInfo,
}) => {
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});

  const filtersAppliedInfo = () => {
    const filtersApplied = Object.keys(filters).filter(
      (key) => key !== "sortBy"
    ).length;

    if (filtersApplied === 0) return;

    return (
      <div style={{ textAlign: "right" }}>{`${filtersApplied} filtro${
        filtersApplied > 1 ? "s" : ""
      } aplicado${filtersApplied > 1 ? "s" : ""}`}</div>
    );
  };

  return (
    <Fragment>
      <InfoContainer>
        {topRightInfo}
        <div>
          <Button onClick={() => setFiltersModalOpen(true)}>Filtros</Button>
          <FiltersModal
            isOpen={filtersModalOpen}
            setIsOpen={setFiltersModalOpen}
            filters={filters}
            setFilters={setFilters}
            filtersFormFields={filtersFormFields}
            handleConfirmForm={handleConfirmForm}
          />
        </div>
      </InfoContainer>
      {filtersAppliedInfo()}
      {dataContainer}
    </Fragment>
  );
};

export default DataWithFilters;
