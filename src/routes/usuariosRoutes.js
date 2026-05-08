import { Router } from "express";
import { buscarUsuario, registrar } from "../models/usuarioModel.js";

const router = Router();

// -- METODOS POST --

//Registrar usuarios
router.post("/", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const novoUsuario = await registrar(usuario, senha);
    res
      .status(201)
      .json(`Usuario ${novoUsuario.usuario} registrado com sucesso!`);
  } catch (err) {
    res.status(500).json({ erro: "Não foi possível registrar." });
  }
});

router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const user = await buscarUsuario(usuario);

    if (!user) {
      return res.status(401).json("Usuario invalido.");
    }

    if (senha !== user.senha) {
      return res.status(401).json("Senha invalida.");
    }

    res.status(200).json({
      mensagem: "Login realizado!",
      id: user.id,
      usuario: user.usuario,
    });
  } catch (err) {
    res.status(500).json("Erro");
  }
});
export default router;
