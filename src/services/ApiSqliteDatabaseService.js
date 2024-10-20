const db = require('better-sqlite3')('./api-database.db');

db.prepare(`CREATE TABLE IF NOT EXISTS api_keys (
      api_key TEXT PRIMARY KEY,
      createdBy TEXT NOT NULL,
      description TEXT,
      permissions TEXT NOT NULL,
      uses INTEGER,
      createdAt TEXT NOT NULL
    )
`).run();

module.exports = {
    async get(key) {
        let row = await db.prepare('SELECT * FROM api_keys WHERE api_key = ?').get(key);

        return row ? row : undefined;
    },

    async set(api_key, data) {
        await this.delete(key);

        await db.prepare('INSERT INTO api_keys (api_key, createdBy, description, permissions, uses, createdAt) VALUES (?, ?, ?, ?, ?, ?)').run(api_key, data.createdBy, data.description, data.permissions, data.uses, data.createdAt);

        return true;
    },

    async delete(key) {
        db.prepare('DELETE FROM api_keys WHERE api_key=?').run(key);

        return true;
    }
};