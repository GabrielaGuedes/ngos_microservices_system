export interface IChargeCreditCard {
  creditCardNumber: number;
  cvv: number;
  donatedValue: number;
  expireMonth: number;
  expireYear: number;
  name: string;
  birthDate: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone?: number;
  occupation?: string;
  motivation?: string;
}

export interface IChargeCreated {
  donationId: string;
  donatorId: string;
}
