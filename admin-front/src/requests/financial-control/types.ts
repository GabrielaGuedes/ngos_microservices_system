export interface ITransaction extends IBaseTransaction {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewTransaction extends IBaseTransaction {}

export interface ITransactionFilters {
  origin?: string;
  minValue?: number;
  maxValue?: number;
  recurrent?: boolean;
  showCanceled?: boolean;
}

export interface IGoal extends IBaseGoal {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewGoal extends IGoal {}

export interface IGoalFilters {
  reached?: boolean;
}

export interface IGroupedTransactionByOrigin {
  origin: string;
  totalValue: number;
}

export interface IGroupedTransactionByOriginFilters {
  kind?: TransactionKind;
  showCanceled?: boolean;
}

export interface IBalance {
  currentValue: number;
}

export interface IRecurrent {
  currentValue: number;
}

interface IBaseTransaction {
  date: Date;
  value: number;
  origin: string;
  kind: TransactionKind;
  recurrent: boolean;
  description?: string;
  canceledAt?: Date;
}

interface IBaseGoal {
  goalValue: number;
  currentValue: number;
  deadline: Date;
  reached: boolean;
  description?: string;
}

export type TransactionKind = "IN" | "OUT";
