export interface ICustomer_Entity {
  customerId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerPassword: string;
  customerCreatedAt?: Date;
}
export default class Customer_Entity {
  _customerId?: string;
  _customerName: string;
  _customerPhone?: string;
  _customerEmail: string;
  _customerPassword: string;
  _customerCreatedAt?: Date;

  constructor(props: ICustomer_Entity) {
    this._customerId = props.customerId;
    this._customerName = props.customerName;
    this._customerPhone = props.customerPhone;
    this._customerEmail = props.customerEmail;
    this._customerPassword = props.customerPassword;
    this._customerCreatedAt = props.customerCreatedAt;
  }
}