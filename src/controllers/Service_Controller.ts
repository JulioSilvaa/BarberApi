import { NextFunction, Request, Response } from "express";
import Service_RepositoryInDB from "./../infra/repositoriesInDB/service/Service_RepositoryInDB";
import Create_Service from "src/core/useCase/services/Create";
import Delete_Service from "src/core/useCase/services/Delete";
import Update_Service from "src/core/useCase/services/Update";
import GetAll_Services from "src/core/useCase/services/Get";

export default class Employee_Controller {
  static async save(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceDB = new Service_RepositoryInDB();
      const createServiceData = new Create_Service(serviceDB);
      await createServiceData.execute(req.body, req.employee_role);
      res.status(201).json({ message: "Serviço adicionado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceDB = new Service_RepositoryInDB();
      const removeServiceData = new Delete_Service(serviceDB);
      await removeServiceData.execute(req.params.id, req.employee_role);
      res.status(200).json({ message: "Serviço excluído com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceDB = new Service_RepositoryInDB();
      const updateServiceData = new Update_Service(serviceDB);
      await updateServiceData.execute(
        {
          ...req.body,
          serviceId: req.params.id,
        },
        req.employee_role
      );
      res.status(200).json({ message: "Serviço atualizado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const serviceDB = new Service_RepositoryInDB();
      const getServicesData = new GetAll_Services(serviceDB);
      const servicesList = await getServicesData.execute();
      res.status(200).json({ services: servicesList });
    } catch (error) {}
  }
}
