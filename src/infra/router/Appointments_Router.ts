import { Router } from "express";

import ExpressAdapter from "src/adapters/ExpressAdapter";
import Appointments_Controller from "src/controllers/Appointments_Controller";
import AuthCustomer from "src/middlewares/AuthCustomer";

const router = Router();

router.post(
  "/register",
  AuthCustomer.auth,
  ExpressAdapter.create(Appointments_Controller.save)
);

router.delete(
  "/:id",
  AuthCustomer.auth,
  ExpressAdapter.create(Appointments_Controller.delete)
);

router.get(
  "/:id",
  AuthCustomer.auth,
  ExpressAdapter.create(Appointments_Controller.find)
);
router.get("/", ExpressAdapter.create(Appointments_Controller.get));

export default router;
