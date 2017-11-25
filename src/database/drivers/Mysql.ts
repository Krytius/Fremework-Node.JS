import { createConnection, QueryError, RowDataPacket } from "mysql";
import { Config } from "../../Config";
import { WhereModel } from "../Database";

export class Mysql {

    private connection;
    private transaction = false;

    /**
     * Start na connexão
     */
    private start() {
        this.connection = createConnection(Config.Connection);

        this.connection.connect(function (err) {
            if (err) {
                console.error('Problema na conexão com o banco de dados: ' + err.stack);
                return;
            }
        });
    }

    /**
     * Fecha a connexão
     */
    private end() {
        this.connection.end();
    }

    public startTransaction() {
        this.start();
        this.transaction = true;
        this.query("SET AUTOCOMMIT=0;");
        this.query("START TRANSACTION;");
    }

    public commit() {
        this.query("COMMIT;");
        this.transaction = false;
        this.end();
    }

    public rollback() {
        this.query("ROLLBACK;");
        this.transaction = false;
        this.end();
    }

    /**
     * Executa um comando sql
     * @param query SQL commando
     */
    public query(query: string): Promise<any> {
        let transaction = this.transaction;

        if (Config.DEBUG) {
            console.log(query);
        }

        // Não inicializa conexão se for uma transaction
        if (!transaction) {
            this.start();
        }
        
        let end = this.end.bind(this);
        let rollback = this.rollback.bind(this);
        let connection = this.connection;
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results, fields) => {
                if (error) {

                    if (Config.DEBUG) console.log(error);

                    if(transaction) {
                        rollback();
                    }

                    reject(error);
                }
                else {

                    if (Config.DEBUG) console.log(results);

                    resolve(results);
                }

                // Não fecha conexão se for uma transaction
                if (!transaction) {
                    end();
                }
            });
        });
    }

    /**
     * Get itens banco de dados
     * @param table 
     * @param select 
     * @param where 
     * @param orderBy 
     * @param limit 
     * @param offset 
     */
    public get(table: string, select?: Array<string>, where?: Array<WhereModel>, orderBy?: string, limit?: number, offset?: number) {

        var whereSql = [];
        if (where) {
            for (var key in where) {
                if (where[key].operator) {
                    whereSql.push(`${where[key].col} ${where[key].operator} ${where[key].value}`);
                } else {
                    whereSql.push(`${where[key].col} = ${where[key].value}`);
                }
            }
        }

        var query = ``;

        if (select) {
            query = `SELECT ${select.join(`,`)} `;
        } else {
            query = `SELECT * `;
        }

        query += `FROM ${table} `;

        if (whereSql.length > 0) {
            query += `WHERE ${whereSql.join(`,`)} `
        }

        if (orderBy) {
            query += `ORDER BY ${orderBy} `
        }

        if (limit) {
            query += `LIMIT ${limit}`
            if (offset) {
                query += `,${offset} `
            }
        }

        return this.query(`${query};`);
    }

    public getRow(table: string, id: number) {
        var where = Object.assign(new Array<WhereModel>(), [{ col: `id`, value: id }])
        return this.get(table, [`*`], where);
    }

    /**
     * Insere itens no banco de dados
     * @param table 
     * @param itens 
     */
    public insert(table: string, itens: any) {

        var query = `INSERT INTO ${table} `;

        var col = [];
        var values = [];
        for (var key in itens) {
            col.push(key);
            values.push(itens[key]);
        }

        query += `(${col.join(`,`)}) VALUES (${values.join(`,`)})`;

        return this.query(`${query};`);
    }

    /**
     * Deleta linha no banco de dados
     * @param table 
     * @param where 
     */
    public delete(table: string, where: Array<WhereModel>) {

        var query = `DELETE FROM ${table} `;

        var whereSql = [];
        if (where) {
            for (var key in where) {
                if (where[key].operator) {
                    whereSql.push(`${where[key].col} ${where[key].operator} ${where[key].value}`);
                } else {
                    whereSql.push(`${where[key].col} = ${where[key].value}`);
                }
            }
        }

        if (whereSql.length > 0) {
            query += `WHERE ${whereSql.join(`,`)} `
        }

        return this.query(`${query};`);
    }

    /**
     * Atualiza linha banco de dados
     * @param table 
     * @param set 
     * @param where 
     */
    public update(table: string, set: any, where: Array<WhereModel>) {
        var query = `UPDATE ${table} SET `;

        let cont = 0;
        for (var key in set) {
            if (cont > 0) {
                query += `,`;
            }

            query += `${key} = ${set[key]} `;
            cont++;
        }

        var whereSql = [];
        if (where) {
            for (var key in where) {
                if (where[key].operator) {
                    whereSql.push(`${where[key].col} ${where[key].operator} ${where[key].value}`);
                } else {
                    whereSql.push(`${where[key].col} = ${where[key].value}`);
                }
            }
        }

        if (whereSql.length > 0) {
            query += `WHERE ${whereSql.join(`,`)} `
        }

        return this.query(`${query};`);
    }
}

