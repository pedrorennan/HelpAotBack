import { pool } from "../database/connection.js";

export async function registrar(usuario, senha) {
  const queryText =
    'INSERT INTO "Usuarios" ("usuario", "senha") VALUES($1, $2) RETURNING *';
  const values = [usuario, senha];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Erro:", err.stack);
    throw err;
  }
}

export async function buscarUsuario(usuario) {
  const queryText = 'SELECT * FROM "Usuarios" WHERE "usuario" = $1';
  try {
    const res = await pool.query(queryText, [usuario]);

    return res.rows[0];
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
}

export async function buscarUsuarios() {
  const queryText = 'SELECT * FROM "Usuarios"';
  try {
    const res = await pool.query(queryText);

    return res.rows;
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
}

export async function buscarUsuarioId(id) {
  const queryText = 'SELECT * FROM "Usuarios" WHERE "id" = $1';
  try {
    const res = await pool.query(queryText, [id]);

    return res.rows[0];
  } catch (err) {
    console.error("Erro:", err);
    throw err;
  }
}

export async function deletarUsuario(id) {
  try {
    const res = await pool.query('DELETE FROM "Usuarios" WHERE id = $1', [id]);
    return res.rowsCount;
  } catch (err) {
    console.error("Erro ao deletar ficha: ", err);
    throw err;
  }
}
