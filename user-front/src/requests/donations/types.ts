export interface IChargeCreditCard {
  creditCardNumber: number;
  cvv: number;
  donatedValue: number;
  expireMonth: string;
  expireYear: string;
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
