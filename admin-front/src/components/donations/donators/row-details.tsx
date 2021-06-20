import React from "react";
import { IDonator } from "../../../requests/donations/types";
import { RowContainer, TupleContainer, TupleItem } from "./row-details.style";

interface IRowDetails {
  row: IDonator;
}

const RowDetails: React.FC<IRowDetails> = ({ row }) => {
  return (
    <RowContainer>
      <TupleContainer>
        <TupleItem>
          <b>Estado: </b>
          {row.state}
        </TupleItem>
        <TupleItem>
          <b>País: </b>
          {row.country}
        </TupleItem>
      </TupleContainer>
      <TupleContainer>
        <TupleItem>
          <b>Email: </b>
          {row.email}
        </TupleItem>
        <TupleItem>
          <b>Celular: </b>
          {row.phone}
        </TupleItem>
      </TupleContainer>
      <TupleContainer>
        <TupleItem>
          <b>Profissão: </b>
          {row.occupation}
        </TupleItem>
        <TupleItem>
          <b>Motivação: </b>
          {row.motivation}
        </TupleItem>
      </TupleContainer>
    </RowContainer>
  );
};

export default RowDetails;
