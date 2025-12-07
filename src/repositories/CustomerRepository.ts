import { pool } from '../config/db';
import { Customer } from '../models/Customer';

export class CustomerRepository {
  async findByEmail(email: string): Promise<Customer | null> {
    const res = await pool.query('SELECT * FROM customer WHERE email = $1', [email]);
    if (res.rowCount === 0) return null;
    return new Customer(res.rows[0]);
  }

  async create(data: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: number;
  }): Promise<Customer> {
    const res = await pool.query(
      `INSERT INTO customer (id, name, email, password, role)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [data.id, data.name, data.email, data.password, data.role]
    );

    return new Customer(res.rows[0]);
  }
}
