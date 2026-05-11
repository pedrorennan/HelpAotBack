import { Router } from "express";
import {
  buscarUsuario,
  buscarUsuarioId,
  buscarUsuarios,
  deletarUsuario,
  registrar,
} from "../models/usuarioModel.js";

const router = Router();

// -- METODOS POST --

//Registrar usuarios
router.post("/registrar", async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const novoUsuario = await registrar(usuario, senha);
    res.status(201).json({
      mensagem: "Usuario registrado.",
      id: novoUsuario.id,
      user: novoUsuario.usuario,
    });
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deletarUsuario(id);
  res.status(204).send();
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await buscarUsuarioId(id);
  res.status(200).json({ id: user.id, usuario: user.usuario });
});

router.get("/", async (req, res) => {
  const users = await buscarUsuarios();
  res.status(200).json(users);
});

export default router;
