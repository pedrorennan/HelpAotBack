import { Router } from "express";
import criarFicha, {
  listarFichas,
  buscaFicha,
  deletarFicha,
  atualizarFicha,
} from "../models/fichaModel.js";

const router = Router();

// -- METODOS POST --

//Criar uma ficha nova
router.post("/", async (req, res) => {
  const { nome, classe } = req.body;

  try {
    const ficha = await criarFicha(nome, classe);
    res.status(201).json(`Ficha de ${ficha.nome} criada com sucesso!`);
  } catch (err) {
    res.status(500).json({ erro: "Não foi possível salvar a ficha no banco." });
  }
});

// -- METODOS GET --

//Pegar todas as fichas
router.get("/", async (req, res) => {
  try {
    const fichas = await listarFichas();
    res.status(200).json(fichas);
  } catch (error) {
    res.status(500).json("Erro: " + error);
  }
});

//Pegar 1 ficha
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const ficha = await buscaFicha(id);
  res.json(ficha);
});

// -- METODOS DELETE --

//deletar 1 ficha
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await deletarFicha(id);
  res.status(204).send();
});

// -- METODOS PUT --

//Atualizar uma ficha
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, classe } = req.body;

  try {
    const fichaAtualizada = await atualizarFicha(id, nome, classe);
    res.json({
      mensagem: "Ficha atualizada com sucesso!",
      personagem: fichaAtualizada,
    });
  } catch (err) {
    res.status(500).json("Erro ao atualizar personagem.");
  }
});
export default router;
