import React from "react";
import { IEmployee } from "../../../requests/employees/types";
import { RowContainer, TupleContainer, TupleItem } from "./row-details.style";

interface IRowDetails {
  row: IEmployee;
}

const RowDetails: React.FC<IRowDetails> = ({ row }) => {
  return (
    <RowContainer>
      <TupleContainer>
        <TupleItem>
          <b>Endereço: </b>
          {row.address}
        </TupleItem>
        <TupleItem>
          <b>Estado: </b>
          {row.state}
        </TupleItem>
      </TupleContainer>
      <TupleContainer>
        <TupleItem>
          <b>País: </b>
          {row.country}
        </TupleItem>
        <TupleItem>
          <b>Celular: </b>
          {row.phone}
        </TupleItem>
      </TupleContainer>
      <TupleContainer>
        <TupleItem>
          <b>Data de nascimento: </b>
          {new Date(row.birthDate).toLocaleDateString()}
        </TupleItem>
        <TupleItem>
          <b>Email: </b>
          {row.email}
        </TupleItem>
      </TupleContainer>
      <TupleContainer>
        <TupleItem>
          <b>Informações adicionais: </b>
          {row.additionalInfo}
        </TupleItem>
      </TupleContainer>
    </RowContainer>
  );
};

export default RowDetails;
