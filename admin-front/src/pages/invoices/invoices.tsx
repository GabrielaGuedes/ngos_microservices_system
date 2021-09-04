import React, { Fragment, useEffect, useState } from "react";
import EditCreateInvoiceModal from "../../components/invoices/edit-create-invoice-modal";
import FiltersFormFields from "../../components/invoices/filters-form-fields";
import InvoicesTable from "../../components/invoices/invoices-table";
import { getInvoices } from "../../requests/invoices/get-invoices";
import { IInvoice, IInvoicesFilters } from "../../requests/invoices/types";
import Button from "../../ui-components/button/button";
import DataWithFilters from "../../ui-components/data-with-filters/data-with-filters";
import { errorToast } from "../../ui-components/toasts/toasts";
import { PageTitle } from "../../ui-components/typography/page-title";
import { SPACES } from "../../ui-constants/sizes";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";

interface IInvoices {}

const Invoices: React.FC<IInvoices> = () => {
  const [invoicesResult, setInvoicesResult] = useState<IInvoice[]>();
  const [addInvoiceModalOpen, setAddInvoiceModalOpen] = useState(false);

  useEffect(() => {
    getInvoices()
      .then((res) => setInvoicesResult(res))
      .catch(() => errorToast());
  }, []);

  const refreshData = () => {
    getInvoices()
      .then((res) => setInvoicesResult(res))
      .catch(() => errorToast());
  };

  const handleConfirmForm = (values: IInvoicesFilters): Promise<any> => {
    const cleanedFilters = cleanEmptyEntries(values);

    return getInvoices(cleanedFilters as IInvoicesFilters)
      .then((res) => {
        setInvoicesResult(res);
        return cleanedFilters;
      })
      .catch(() => errorToast());
  };
  return (
    <Fragment>
      <PageTitle>Notas fiscais doadas</PageTitle>
      <DataWithFilters
        loading={!invoicesResult}
        filtersFormFields={<FiltersFormFields />}
        topRightInfo={
          <Fragment>
            <Button
              style={{ marginRight: SPACES.px4 }}
              onClick={() => setAddInvoiceModalOpen(true)}
            >
              Novo registro de doação
            </Button>
            <EditCreateInvoiceModal
              isOpen={addInvoiceModalOpen}
              setIsOpen={setAddInvoiceModalOpen}
              creation
              refreshData={refreshData}
            />
          </Fragment>
        }
        handleConfirmForm={handleConfirmForm}
      >
        {invoicesResult && (
          <InvoicesTable invoices={invoicesResult} refreshData={refreshData} />
        )}
      </DataWithFilters>
    </Fragment>
  );
};

export default Invoices;
