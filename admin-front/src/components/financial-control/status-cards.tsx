import React, { useEffect } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { getBalance } from "../../requests/financial-control/get-balance";
import { getRecurrence } from "../../requests/financial-control/get-recurrence";
import { IBalance, IRecurrent } from "../../requests/financial-control/types";
import BaseCard from "../../ui-components/base-card/base-card";
import { errorToast } from "../../ui-components/toasts/toasts";
import { SPACES } from "../../ui-constants/sizes";
import { StatusValue } from "./status-cards.style";
import Tooltip from "../../ui-components/tooltip/tooltip";

interface IStatusCards {}

const StatusCards: React.FC<IStatusCards> = () => {
  const [balance, setBalance] = useState<IBalance>();
  const [recurrent, setRecurrent] = useState<IRecurrent>();

  useEffect(() => {
    getBalance()
      .then((res) => setBalance(res))
      .catch(() => errorToast());
    getRecurrence()
      .then((res) => setRecurrent(res))
      .catch(() => errorToast());
  }, []);

  return (
    <Fragment>
      <BaseCard
        title="Saldo"
        textAlign="center"
        style={{ marginBottom: SPACES.px20 }}
      >
        <StatusValue>
          {`R$ ${balance?.currentValue || "0,00"}`}
          <Tooltip>
            Seu saldo é formado pela soma de todas as entradas e saídas
            registradas, inclusive as recorrentes.
          </Tooltip>
        </StatusValue>
      </BaseCard>
      <BaseCard title="Recorrência mensal" textAlign="center">
        <StatusValue>{`R$ ${recurrent?.currentValue || "0,00"}`}</StatusValue>
      </BaseCard>
    </Fragment>
  );
};

export default StatusCards;
