import express from "express";
import routes from "./routes";
import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://user:user@cluster0-rm7zn.mongodb.net/clubPetro?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
class App {
  constructor() {
    this.server = express();

    this.midlewares();
    this.routes();
  }
  midlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
