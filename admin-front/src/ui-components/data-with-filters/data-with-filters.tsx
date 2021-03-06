import React, { ReactNode, useState } from "react";
import { Fragment } from "react";
import Button from "../button/button";
import { InfoContainer } from "./data-with-filters.style";
import FiltersModal from "../filters-modal/filters-modal";
import LoadingBox from "../loading-box/loading-box";

interface IDataWithFilters {
  filtersFormFields: ReactNode;
  children?: ReactNode;
  loading?: boolean;
  handleConfirmForm: (values: any) => Promise<any>;
  topRightInfo?: ReactNode;
}

const DataWithFilters: React.FC<IDataWithFilters> = ({
  filtersFormFields,
  children,
  loading,
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
        {topRightInfo || <div />}
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
      {loading ? <LoadingBox /> : children}
    </Fragment>
  );
};

export default DataWithFilters;
