export interface IEmployee extends IBaseEmployee {
  id: number;
  areas: IEmployeeArea[];
  teams: IEmployeeTeam[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmployeeArea extends IBaseArea {
  id: number;
  employees: IEmployee[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEmployeeTeam extends IBaseTeam {
  id: number;
  employees: IEmployee[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INewEmployee extends IBaseEmployee {
  areaIds: number[];
  teamIds: number[];
}

export interface INewEmployeeArea extends IBaseArea {
  employeeIds: number[];
}

export interface INewEmployeeTeam extends IBaseEmployee {
  employeeIds: number[];
}

export interface IEmployeesFilters {
  occupation?: string;
  city?: string;
  state?: string;
  areaId?: number;
  teamId?: number;
}

export interface IEmployeeAreasFilters {
  employeeId?: string;
}

export interface IEmployeeTeamsFilters {
  employeeId?: string;
}

interface IBaseEmployee {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  birthDate: Date;
  hireDate: Date;
  phone: number;
  email: string;
  additionalInfo?: string;
}

interface IBaseArea {
  name: string;
  description?: string;
}

interface IBaseTeam {
  name: string;
  description?: string;
}
