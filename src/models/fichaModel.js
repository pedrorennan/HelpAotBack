import { pool } from "../database/connection.js";

export default async function criarFicha(nome, classe) {
  const queryText =
    'INSERT INTO "Fichas" ("nome", "classe") VALUES($1, $2) RETURNING *';
  const values = [nome, classe];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Erro:", err.stack);
    throw err;
  }
}

export async function listarFichas() {
  try {
    const res = await pool.query('SELECT * FROM "Fichas"');
    return res.rows;
  } catch (err) {
    console.error("Erro ao buscar fichas:", err);
    throw err;
  }
}

export async function buscaFicha(id) {
  try {
    const res = await pool.query('SELECT * FROM "Fichas" WHERE id = $1', [id]);
    return res.rows;
  } catch (err) {
    console.error("Erro ao buscar ficha: ", err);
    throw err;
  }
}

export async function deletarFicha(id) {
  try {
    const res = await pool.query('DELETE FROM "Fichas" WHERE id = $1', [id]);
    return res.rowsCount;
  } catch (err) {
    console.error("Erro ao deletar ficha: ", err);
    throw err;
  }
}

export async function atualizarFicha(id, novoNome, novaClasse) {
  try {
    const queryText =
      'UPDATE "Fichas" SET "nome" = COALESCE($1, "nome"), "classe" = COALESCE($2, "classe") WHERE id = $3 RETURNING *';
    const values = [novoNome || null, novaClasse || null, id];
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Erro ao atualizar ficha: ", err);
    throw err;
  }
}
