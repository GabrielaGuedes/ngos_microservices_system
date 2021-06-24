import React from "react";
import { Fragment } from "react";
import { EMOJIS } from "../icons/emojis";

interface IShyEmptyState {}

const ShyEmptyState: React.FC<IShyEmptyState> = () => {
  return (
    <Fragment>
      <i>Nada para exibir </i>
      {EMOJIS.sad}
    </Fragment>
  );
};

export default ShyEmptyState;
