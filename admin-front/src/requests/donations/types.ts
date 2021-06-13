export interface IDonations {
  donations: IDonation[];
  total: string;
}

export interface IDonation {
  _id: string;
  donationId: string;
  status: string;
  amount: string;
  donatorEmail: string;
  source: string;
  createdAt: string;
}

export interface IDonator {
  _id: string;
  email: string;
  birthDate: Date;
  city: string;
  country: string;
  donatedValue: string;
  motivation: string;
  name: string;
  occupation: string;
  phone: string;
  state: string;
  createdAt: Date;
}

export interface IDonationsFilters {
  paid?: boolean;
  source?: string;
  minValue?: string;
  maxValue?: string;
  sortBy?: "status" | "updatedAt" | "amount" | "donatorEmail" | "source";
}

export interface IDonatorsFilters {
  city?: string;
  state?: string;
  country?: string;
  minValue?: string;
  maxValue?: string;
  sortBy?:
    | "name"
    | "birthDate"
    | "occupation"
    | "motivation"
    | "city"
    | "state"
    | "country"
    | "email"
    | "phone"
    | "donatedValue"
    | "updatedAt";
}
