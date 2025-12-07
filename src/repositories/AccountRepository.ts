import { pool } from '../config/db';
import { Account } from '../models/Account';

export class AccountRepository {
  async create(data: Account) {
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
    const res = await pool.query(`DELETE FROM account WHERE id = $1`, [id]);
    return res.rowCount! > 0;
  }

  async getAllAccounts() {
    const result = await pool.query('SELECT * FROM account ORDER BY created_at DESC');
    return result.rows;
  }

  async getAccountsByCustomer(customerId: string) {
    const result = await pool.query('SELECT * FROM account WHERE customer_id = $1', [customerId]);
    return result.rows;
  }

  async getAccountById(idAccount: string) {
    const result = await pool.query('SELECT * FROM account WHERE id = $1', [idAccount]);
    return result.rows[0] || null;
  }
}
