export interface IEmployee_Entity {
  employeeId?: string;
  employeeName: string;
  employeePassword: string;
  employeeEmail: string;
  employeeRole: "admin" | "user" | "gerente";
}

export default class Employee_Entity {
  _employeeId?: string;
  _employeeName: string;
  _employeeRole: string;
  _employeeEmail: string;
  _employeePassword: string;

  constructor(props: IEmployee_Entity) {
    this._employeeId = props.employeeId;
    this._employeeName = props.employeeName;
    this._employeeEmail = props.employeeEmail;
    this._employeeRole = props.employeeRole;
    this._employeePassword = props.employeePassword;
  }
}