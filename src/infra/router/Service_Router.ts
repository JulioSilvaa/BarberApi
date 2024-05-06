import { Router } from "express";

import ExpressAdapter from "src/adapters/ExpressAdapter";
import Service_Controller from "src/controllers/Service_Controller";
import AuthEmployee from "src/middlewares/AuthEmployee";

const router = Router();

router.post(
  "/register",
  AuthEmployee.auth,
  ExpressAdapter.create(Service_Controller.save)
);

router.delete(
  "/:id",
  AuthEmployee.auth,
  ExpressAdapter.create(Service_Controller.delete)
);

router.patch(
  "/update/:id",
  AuthEmployee.auth,
  ExpressAdapter.create(Service_Controller.update)
);

router.get("/", ExpressAdapter.create(Service_Controller.getAll));

export default router;
