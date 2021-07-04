import React, { useEffect, Fragment, useState } from "react";
import { getGroupedTransactionsByOrigin } from "../../requests/financial-control/get-grouped-transactions-by-origin";
import {
  IGroupedTransactionByOrigin,
  IGroupedTransactionByOriginFilters,
} from "../../requests/financial-control/types";
import { errorToast } from "../../ui-components/toasts/toasts";
import GroupedTransactionsTable from "./grouped-transactions-table";
import LoadingBox from "../../ui-components/loading-box/loading-box";
import { CheckBox, Select } from "grommet";
import { IOption } from "../../ui-components/select/types";
import { cleanEmptyEntries } from "../../utils/empty-entries-cleaner";
import { FiltersContainer } from "./transactions-grouped-by-origin.style";

interface ITransactionsGroupedByOrigin {}

const TransactionsGroupedByOrigin: React.FC<ITransactionsGroupedByOrigin> =
  () => {
    const [groupedTransactionsResult, setGroupedTransactionsResult] =
      useState<IGroupedTransactionByOrigin[]>();
    const [kindFilter, setKindFilter] = useState<IOption>();
    const [showCanceled, setShowCanceled] = useState(false);

    useEffect(() => {
      getGroupedTransactionsByOrigin()
        .then((res) => setGroupedTransactionsResult(res))
        .catch(() => errorToast());
    }, []);

    const refreshData = (filters: IGroupedTransactionByOriginFilters | any) => {
      const cleanedFilters = cleanEmptyEntries(filters);
      getGroupedTransactionsByOrigin(cleanedFilters)
        .then((res) => setGroupedTransactionsResult(res))
        .catch(() => errorToast());
    };

    return (
      <Fragment>
        <FiltersContainer>
          <Select
            clear
            placeholder="Tipo"
            options={[
              { label: "Apenas entradas", value: "IN" },
              { label: "Apenas saídas", value: "OUT" },
            ]}
            labelKey="label"
            valueKey="value"
            onChange={({ option }) => {
              setKindFilter(option);
              refreshData({
                showCanceled,
                kind: option?.value,
              });
            }}
          />
          <CheckBox
            label="Mostrar também as transações canceladas"
            checked={showCanceled}
            onChange={(event) => {
              setShowCanceled(event.target.checked);
              refreshData({
                showCanceled,
                kind: kindFilter?.value,
              });
            }}
          />
        </FiltersContainer>
        {groupedTransactionsResult ? (
          <GroupedTransactionsTable
            groupedTransactions={groupedTransactionsResult}
          />
        ) : (
          <LoadingBox />
        )}
      </Fragment>
    );
  };

export default TransactionsGroupedByOrigin;
