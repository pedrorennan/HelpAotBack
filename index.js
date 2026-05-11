import express from "express";
import cors from "cors";
import fichasRoutes from "./src/routes/fichasRoutes.js";
import usersRoutes from "./src/routes/usuariosRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/personagens", fichasRoutes);
app.use("/usuarios", usersRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
