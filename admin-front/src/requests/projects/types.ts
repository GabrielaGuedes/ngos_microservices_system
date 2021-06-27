export interface IProject extends IBaseProject {
  id: 7;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface INewProject extends IBaseProject {}

export interface IProjectsFilters {
  status?: ProjectStatus;
  minStartDate?: Date;
  maxStartDate?: Date;
  minCostDate?: Date;
  maxCostDate?: Date;
  minIncomeDate?: Date;
  maxIncomeDate?: Date;
  minIncome?: number;
  maxCost?: number;
}

export interface ITotalIncomeExpected {
  totalExpectedIncome: number;
}

export interface ITotalCostExpected {
  totalExpectedCost: number;
}

interface IBaseProject {
  name: string;
  startDate: Date;
  endDate?: Date;
  incomeDate?: Date;
  costDate?: Date;
  expectedIncome?: number;
  expectedCost?: number;
  description?: string;
  target?: string;
  responsibleArea?: string;
  responsibleTeam?: string;
  status?: ProjectStatus;
}

type ProjectStatus = "PENDING" | "FINISHED" | "CANCELED";
