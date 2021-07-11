export interface IInvoice extends IBaseInvoice {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface INewInvoice extends IBaseInvoice {}

export interface IInvoicesFilters {
  minDate: Date;
  maxDate: Date;
}

interface IBaseInvoice {
  donationDate: Date;
  donatorEmail: string;
  donatorName: string;
}
