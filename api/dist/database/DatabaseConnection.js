"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
class DatabaseConnection {
    constructor() {
        this.connection = (0, promise_1.createConnection)({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'teste_node'
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
