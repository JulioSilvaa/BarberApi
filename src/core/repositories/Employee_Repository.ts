import Employee_Entity, { IEmployee_Entity } from "../entities/Employee_Entity";

export default interface Employee_Repository {
  add(props: IEmployee_Entity): Promise<void>;

  update(props: IEmployee_Entity): Promise<void>;

  find(employeeId: string): Promise<IEmployee_Entity>;

  findByEmail(email: string): Promise<IEmployee_Entity>

  delete(props: any): Promise<void>

  get(): Promise<IEmployee_Entity[]>;

}
