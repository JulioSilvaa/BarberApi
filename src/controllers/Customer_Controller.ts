import { Request, Response, NextFunction } from "express";
import AuthCustomer from "src/core/useCase/customer/Auth";
import Create_Customer from "src/core/useCase/customer/Create";
import Delete_Customer from "src/core/useCase/customer/Delete";
import Find_CustomerByEmail from "src/core/useCase/customer/FindByEmail";
import Find_CustomerById from "src/core/useCase/customer/FindById";
import GetAll_Customers from "src/core/useCase/customer/Get";
import Update_Customer from "src/core/useCase/customer/Update";
import HTTPError from "src/errors/ErrorsHTTP";
import Customer_RepositoryDB from "src/infra/repositoriesInDB/customer/Customer_RepositoryDB";

export default class Customer_Controller {
  static async add(req: Request, res: Response, next: NextFunction) {
    try {
      const clientDB = new Customer_RepositoryDB();
      const customerByEmail = new Find_CustomerByEmail(clientDB);
      await customerByEmail.execute(
        req.body.customerEmail
      );
      const createClient = new Create_Customer(clientDB);
      res.status(201).json({ message: "Cliente adicionado com sucesso!" });
      await createClient.execute(req.body);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.params.id;
      const loggedInId = req.customer_id
      const clientDB = new Customer_RepositoryDB();
      const sendCustomerId = new Find_CustomerById(clientDB);
      const customer = await sendCustomerId.execute({ customerId, loggedInId });

      if (!customer) {
        throw new HTTPError(400, "Cliente não encontrado!");
      }

      const customerDelete = new Delete_Customer(clientDB);
      await customerDelete.execute({ customerId, loggedInId });
      res.status(200).json({ message: "Cliente excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const clientDB = new Customer_RepositoryDB();
      const getCustomersList = new GetAll_Customers(clientDB);
      const customerList = await getCustomersList.execute();
      res.status(200).json({ customers: customerList });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const customerId = req.params.id;
      const loggedInId = req.customer_id
      const { customerName, customerEmail, customerPassword, customerPhone } =
        req.body;
      const clientDB = new Customer_RepositoryDB();
      const sendCustomerId = new Find_CustomerById(clientDB);
      const customer = await sendCustomerId.execute({ customerId, loggedInId });

      if (!customer) {
        throw new HTTPError(400, "Cliente não encontrado!");
      }

      const updateCustomer = new Update_Customer(clientDB);
      await updateCustomer.execute({
        customerId,
        customerName,
        customerEmail,
        customerPassword,
        customerPhone,
        loggedInId
      });
      res.status(200).json({ message: "Dados atualizados com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.query;
      const customerDB = new Customer_RepositoryDB();
      const sendCustomerId = new Find_CustomerById(customerDB);
      const customer = await sendCustomerId.execute(id as string);

      if (!customer) {
        throw new HTTPError(400, "Cliente não encontrado!");
      }
      return res.status(200).json({ data: customer });
    } catch (error) {
      next(error);
    }
  }

  static async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const customerDB = new Customer_RepositoryDB();
      const userAuthenticated = new AuthCustomer(customerDB);
      const customerData = await userAuthenticated.execute(email, password);
      return res.status(200).json({ customerData });
    } catch (error) {
      next(error);
    }
  }
}
