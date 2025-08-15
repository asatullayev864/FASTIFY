import pg from '../db/index.js';

export class DBService {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async createDB(body) {
        const columns = Object.keys(body).join(', ');
        const values = '';
        for (let i = 1; i <= Object.keys(body).length; i++){
            values += `$${i}`;
        }
        const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values}) RETURNING *`;
        const { rows } = await pg.query(query, Object.values(body));
        return rows[0];
    }

    async findAllDB(options = `ORDER BY id ASC`) {
        const { rows } = await pg.query(`SELECT * FROM ${this.tableName} ${options}`);
        return rows;
    }

    async findByIdDB(id) {
        const { rows } = await pg.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        return rows[0];
    }

    async findOneDB(condition) {
        const keys = Object.keys(condition);
        const values = Object.values(condition);
        const whereClause = keys.map((key, i) => `${key} = $${i + 1}`).join(' AND ');
        const query = `SELECT * FROM ${this.tableName} WHERE ${whereClause} LIMIT 1`;
        const { rows } = await pg.query(query, values);
        return rows[0] || null;
    }

    async updateDB(id, body) {
        let columns = Object.keys(body);
        let keys = '';

        for (let i = 0; i < columns.length; i++) {
            if (i === columns.length - 1) {
                keys += `${columns[i]} = $${i + 1}`;
            } else {
                keys += `${columns[i]} = $${i + 1}, `;
            }
        }

        const query = `UPDATE ${this.tableName} SET ${keys} WHERE id = $${columns.length + 1} RETURNING *`;
        const { rows } = await pg.query(query, [...Object.values(body), id]);
        return rows[0];
    }

    async removeDB(id) {
        const { rows } = await pg.query(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`, [id]);
        return rows[0] || null;
    }
}