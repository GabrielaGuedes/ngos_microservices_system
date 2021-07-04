import React from "react";
import { ITransaction } from "../../requests/financial-control/types";
import ShyEmptyState from "../../ui-components/shy-empty-state/shy-empty-state";
import { RowContainer, ItemContainer } from "./row-details.style";

interface IRowDetails {
  row: ITransaction;
}

const RowDetails: React.FC<IRowDetails> = ({ row }) => {
  return (
    <RowContainer>
      <ItemContainer>
        <b>Descrição: </b>
        {row.description || <ShyEmptyState />}
      </ItemContainer>
      <ItemContainer>
        <b>Recorrência finalizada em: </b>
        {row.canceledAt ? new Date(row.canceledAt).toLocaleDateString() : "-"}
      </ItemContainer>
    </RowContainer>
  );
};

export default RowDetails;
