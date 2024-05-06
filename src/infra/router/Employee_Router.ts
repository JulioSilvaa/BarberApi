import { Router } from "express";

import ExpressAdapter from "src/adapters/ExpressAdapter";
import Employee_Controller from "src/controllers/Employee_Controller";
import AuthEmployee from "src/middlewares/AuthEmployee"

const router = Router();

router.post("/register", ExpressAdapter.create(Employee_Controller.add));
router.get("/:id", ExpressAdapter.create(Employee_Controller.find));
router.post("/auth", ExpressAdapter.create(Employee_Controller.auth))
router.get("/", ExpressAdapter.create(Employee_Controller.getAll));
router.patch("/:id", AuthEmployee.auth, ExpressAdapter.create(Employee_Controller.update));
router.delete("/:id", AuthEmployee.auth, ExpressAdapter.create(Employee_Controller.delete))

export default router;
