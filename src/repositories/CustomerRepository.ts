import { db, pool } from "../config/db";
import { Customer } from "../models/Customer";

const isProd = process.env.PRODUCTION === "true";

export class CustomerRepository {
  async findByEmail(email: string) {
    if (isProd) {
      const { data, error } = await db.select("customer", { email });
      if (error || !data.length) return null;
      return new Customer(data[0]);
    }

    const res = await pool.query(
      `SELECT * FROM customer WHERE email = $1`,
      [email]
    );
    if (res.rowCount === 0) return null;
    return new Customer(res.rows[0]);
  }

  async create(data: Customer) {
    if (isProd) {
      const { data: result, error } = await db.insert("customer", data);
      if (error) throw error;
      return new Customer(result[0]);
    }

    const res = await pool.query(
      `
      INSERT INTO customer (id, name, email, password, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [data.id, data.name, data.email, data.password, data.role]
    );

    return new Customer(res.rows[0]);
  }
}