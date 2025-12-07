import { db, pool } from "../config/db";
import { Deposito } from "../models/Deposito";

const isProd = process.env.PRODUCTION === "true";

export class DepositoRepository {
  async create(data: { name: string; yearly_return: number }) {
    if (isProd) {
      const { data: result, error } = await db.insert("deposito", data);
      if (error) throw error;
      return new Deposito(result[0]);
    }

    const res = await pool.query(
      `
      INSERT INTO deposito (name, yearly_return)
      VALUES ($1, $2)
      RETURNING *
      `,
      [data.name, data.yearly_return]
    );

    return new Deposito(res.rows[0]);
  }

  async update(id: number, data: { name?: string; yearly_return?: number }) {
    if (isProd) {
      const { data: result, error } = await db.update(
        "deposito",
        "id",
        id,
        data
      );
      if (error) throw error;

      return result[0] ? new Deposito(result[0]) : null;
    }

    const res = await pool.query(
      `
      UPDATE deposito
      SET name = COALESCE($1, name),
          yearly_return = COALESCE($2, yearly_return)
      WHERE id = $3
      RETURNING *
      `,
      [data.name, data.yearly_return, id]
    );

    if (res.rowCount === 0) return null;
    return new Deposito(res.rows[0]);
  }

  async delete(id: number) {
    if (isProd) {
      const { error } = await db.delete("deposito", "id", id);
      if (error) return false;
      return true;
    }

    const res = await pool.query(`DELETE FROM deposito WHERE id = $1`, [id]);
    return res.rowCount! > 0;
  }

  async getAllDepositos() {
    if (isProd) {
      const { data, error } = await db.select("deposito");
      if (error) throw error;
      return data;
    }

    const result = await pool.query(`SELECT * FROM deposito`);
    return result.rows;
  }
}