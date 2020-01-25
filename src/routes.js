import express from "express";

import clientController from "./Controllers/clientController";
import employeeController from "./Controllers/employeeController";
import sessionController from "./Controllers/sessionController";
import transactionController from "./Controllers/transactionController";

import employeeAuth from "./middlewares/employeeAuth";

const routes = express.Router();

routes.post("/users", clientController.store);
routes.get("/users", clientController.index);
routes.put("/users/:cpf", clientController.update);

routes.post("/employees", employeeController.store);
routes.get("/employees", employeeController.index);
routes.put("/employees/:cpf", employeeController.update);

routes.post("/sessions", sessionController.store);

routes.post("/transactions", employeeAuth, transactionController.store);
routes.get("/transactions", transactionController.index);
export default routes;
