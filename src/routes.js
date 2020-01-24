import express from "express";

import clientController from "./Controllers/clientController";
import employeeController from "./Controllers/employeeController";

const routes = express.Router();

routes.post("/users", clientController.store);
routes.get("/users", clientController.index);
routes.put("/users/:cpf", clientController.update);

routes.post("/employees", employeeController.store);
routes.get("/employees", employeeController.index);
routes.put("/employees/:cpf", employeeController.update);

export default routes;
