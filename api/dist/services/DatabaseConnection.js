"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
require('dotenv').config();
class DatabaseConnection {
    constructor() {
        this.connection = (0, promise_1.createConnection)({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || 'urubu_do_pix'
        });
    }
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
    async getConnection() {
        return await this.connection;
    }
}
exports.default = DatabaseConnection;
