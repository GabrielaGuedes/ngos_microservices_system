export interface IVolunteer extends IBaseVolunteer {
  id: number;
  areas: IVolunteerArea[];
  teams: IVolunteerTeam[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IVolunteerArea extends IBaseArea {
  id: number;
  volunteers: IVolunteer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IVolunteerTeam extends IBaseTeam {
  id: number;
  volunteers: IVolunteer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INewVolunteer extends IBaseVolunteer {
  areaIds: number[];
  teamIds: number[];
}

export interface INewVolunteerArea extends IBaseArea {
  volunteerIds: number[];
}

export interface INewVolunteerTeam extends IBaseVolunteer {
  volunteerIds: number[];
}

export interface IVolunteersFilters {
  city?: string;
  state?: string;
  areaId?: number;
  teamId?: number;
}

export interface IVolunteerAreasFilters {
  volunteerId?: string;
}

export interface IVolunteerTeamsFilters {
  volunteerId?: string;
}

interface IBaseVolunteer {
  name: string;
  address?: string;
  city: string;
  state: string;
  country: string;
  birthDate: Date;
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
