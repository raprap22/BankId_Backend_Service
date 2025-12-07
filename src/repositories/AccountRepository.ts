
import { db, pool } from "../config/db";
import { Account } from "../models/Account";

const isProd = process.env.PRODUCTION === "true";

export class AccountRepository {
  async create(data: Account) {
    if (isProd) {
      const { data: result, error } = await db.insert("account", data);
      if (error) throw error;
      return new Account(result[0]);
    }

    // Local PostgreSQL
    const res = await pool.query(
      `
        INSERT INTO account (id, packet, customer_id, balance)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [data.id, data.packet, data.customer_id, data.balance]
    );

    return new Account(res.rows[0]);
  }

  async update(id: number, data: { packet?: number; balance?: number }) {
    if (isProd) {
      const { data: result, error } = await db.update(
        "account",
        "id",
        id,
        data
      );
      if (error) throw error;
      return result[0] ? new Account(result[0]) : null;
    }

    const res = await pool.query(
      `
      UPDATE account
      SET packet = COALESCE($1, packet),
          balance = COALESCE($2, balance)
      WHERE id = $3
      RETURNING *
    `,
      [data.packet, data.balance, id]
    );

    if (res.rowCount === 0) return null;
    return new Account(res.rows[0]);
  }

  async delete(id: number) {
    if (isProd) {
      const { error } = await db.delete("account", "id", id);
      if (error) return false;
      return true;
    }

    const res = await pool.query(`DELETE FROM account WHERE id = $1`, [id]);
    return res.rowCount! > 0;
  }

  async getAllAccounts() {
    if (isProd) {
      const { data, error } = await db.select("account");
      if (error) throw error;
      return data;
    }

    const result = await pool.query(
      `SELECT * FROM account ORDER BY created_at DESC`
    );
    return result.rows;
  }

  async getAccountsByCustomer(customerId: string) {
    if (isProd) {
      const { data, error } = await db.select("account", {
        customer_id: customerId,
      });
      if (error) throw error;
      return data;
    }

    const result = await pool.query(
      `SELECT * FROM account WHERE customer_id = $1`,
      [customerId]
    );
    return result.rows;
  }

  async getAccountById(idAccount: string) {
    if (isProd) {
      const { data, error } = await db.select("account", {
        id: idAccount,
      });
      if (error) throw error;
      return data[0] || null;
    }

    const result = await pool.query(
      `SELECT * FROM account WHERE id = $1`,
      [idAccount]
    );
    return result.rows[0] || null;
  }
}
