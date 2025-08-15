import pg from '../db/index.js';

class DBService {
    constructor(tableName) {
        this.tableName = tableName;
    }

    async create(body) {
        const columns = Object.keys(body).join(', ');
        let values = '';
        for (let i = 1; i <= Object.keys(body).length; i++){
            values += `$${i}`;
        }
        let query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values}) RETURNING *`;
        const { rows } = await pg.query(query, Object.values(body));
        return rows[0];
    }

    async findAll(options = `ORDER BY ID ASC`) {
        const { rows } = await pg.query(`SELECT * FROM ${this.tableName} ${options}`);
        return rows;
    }

    async FindById(id) {
        const { rows } = await pg.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
        return rows[0];
    }

    async FindOne() {
        
    }

    async update() {

    }

    async remove() {

    }
}

export default new DBService();
