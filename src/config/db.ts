import pkg from 'pg';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: +process.env.DB_PORT!,
});

const isProd = process.env.PRODUCTION === 'true';

const supabase = isProd
  ? createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  : null;

export const db = {
  async query(text: string, params?: any[]) {
    if (!isProd) {
      return pool.query(text, params);
    }

    throw new Error('Raw SQL query not supported via Supabase');
  },

  async select(table: string, match: any = {}) {
    if (!isProd) throw new Error('Use pool.query for local mode');

    return supabase!.from(table).select('*').match(match);
  },

  async insert(table: string, data: any) {
    if (!isProd) throw new Error('Use pool.query for local mode');

    return supabase!.from(table).insert(data).select();
  },

  async update(table: string, idField: string, id: any, data: any) {
    if (!isProd) throw new Error('Use pool.query for local mode');

    return supabase!.from(table).update(data).eq(idField, id).select();
  },

  async delete(table: string, idField: string, id: any) {
    if (!isProd) throw new Error('Use pool.query for local mode');

    return supabase!.from(table).delete().eq(idField, id);
  },
};
