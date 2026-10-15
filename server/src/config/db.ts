/**
 * Author: MD Shahed
 * Date: 2026-09-27
 * File Name: server/src/config/db.ts
 * Modified Last: 2026-09-27
 * Description: uofs student 4th year
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'mainstay_user',
  password: process.env.DB_PASSWORD || 'mainstay_password',
  database: process.env.DB_NAME || 'mainstay_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export const testDbConnection = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    console.log(' Successfully connected to MySQL database');
    connection.release();
    return true;
  } catch (error) {
    console.error(' MySQL connection failed:', error);
    return false;
  }
};

export default pool;
