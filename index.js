import express from "express";
import routes from "./src/routes/routes.js";

const app = express();
app.use(express.json());

app.use("/personagens", routes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
