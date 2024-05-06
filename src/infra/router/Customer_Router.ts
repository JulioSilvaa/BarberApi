import { Router } from "express";

import ExpressAdapter from "src/adapters/ExpressAdapter";
import Customer_Controller from "src/controllers/Customer_Controller";
import AuthCustomer from "src/middlewares/AuthCustomer";

const router = Router();

router.get("/search", ExpressAdapter.create(Customer_Controller.search));
router.post("/register", ExpressAdapter.create(Customer_Controller.add));
router.delete("/:id", AuthCustomer.auth, ExpressAdapter.create(Customer_Controller.delete));
router.patch("/:id", AuthCustomer.auth, ExpressAdapter.create(Customer_Controller.update));
router.post("/auth", ExpressAdapter.create(Customer_Controller.auth));
router.get("/", ExpressAdapter.create(Customer_Controller.getAll));

export default router;
