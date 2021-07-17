import React from "react";
import empty from "../../assets/images/empty.png";
import { EmptyStateContainer } from "./empty-state.style";

interface IEmptyState {}

const EmptyState: React.FC<IEmptyState> = () => {
  return (
    <EmptyStateContainer>
      Ops, parece que não há nada aqui.
      <img src={empty} alt="Caixa vazia" />
    </EmptyStateContainer>
  );
};

export default EmptyState;
