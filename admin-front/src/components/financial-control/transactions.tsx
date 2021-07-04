import React, { useEffect } from "react";
import { useState } from "react";
import { getTransactions } from "../../requests/financial-control/get-transactions";
import {
  ITransaction,
  ITransactionFilters,
} from "../../requests/financial-control/types";
import { errorToast } from "../../ui-components/toasts/toasts";
import DataWithFilters from "../../ui-components/data-with-filters/data-with-filters";
import TransactionsFiltersFormFields from "./transactions-filters-form-fields";
import { Fragment } from "react";
import Button from "../../ui-components/button/button";
import EditCreateTransactionModal from "./edit-create-transaction-modal";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";
import TransactionsTable from "./transactions-table";

interface ITransactions {}

const Transactions: React.FC<ITransactions> = () => {
  const [transactionsResult, setTransactionsResult] =
    useState<ITransaction[]>();
  const [addTransactionModalOpen, setAddTransactionModalOpen] = useState(false);

  useEffect(() => {
    getTransactions({})
      .then((res) => setTransactionsResult(res))
      .catch(() => errorToast());
  }, []);

  const refreshData = () => {
    getTransactions({})
      .then((res) => setTransactionsResult(res))
      .catch(() => errorToast());
  };

  const formatFilters = (values: any) => {
    return {
      ...values,
      origin: values.origin?.value,
    };
  };

  const handleConfirmForm = (values: ITransactionFilters): Promise<any> => {
    const formattedValues = formatFilters(values);
    const cleanedFilters = cleanEmptyEntries(formattedValues, [
      "",
      false,
      null,
      undefined,
    ]);

    return getTransactions(cleanedFilters)
      .then((res) => {
        setTransactionsResult(res);
        return cleanedFilters;
      })
      .catch(() => errorToast());
  };

  return (
    <DataWithFilters
      loading={!transactionsResult}
      filtersFormFields={<TransactionsFiltersFormFields />}
      topRightInfo={
        <Fragment>
          <Button onClick={() => setAddTransactionModalOpen(true)}>
            Nova transação
          </Button>
          <EditCreateTransactionModal
            isOpen={addTransactionModalOpen}
            setIsOpen={setAddTransactionModalOpen}
            creation
            refreshData={refreshData}
          />
        </Fragment>
      }
      handleConfirmForm={handleConfirmForm}
    >
      {transactionsResult && (
        <TransactionsTable
          transactions={transactionsResult}
          refreshData={refreshData}
        />
      )}
    </DataWithFilters>
  );
};

export default Transactions;
