import { createConnection, QueryError, RowDataPacket } from "mysql";
import { NextFunction } from "express";
import { Config } from "../../Config";
import { WhereModel } from "../Database";
import { OutError } from "../../helpers/interfaces/OutError";

export class Mysql {

    private next: any;
    private connection;
    private transaction = false;

    constructor(next?: NextFunction) {
        this.next = (next) ? next : false;
    }

    /**
     * Abre a conexão
     */
    private start() {
        this.connection = createConnection(Config.Connection);
        this.connection.connect((err) => {
            if (err) {
                console.error('Problema na conexão com o banco de dados.' + err.stack);
                let error: OutError = {
                    message: 'Problema na conexão com o banco de dados.' + err.stack,
                    code: 1000
                }

                if (typeof (this.next) == 'function') {
                    this.next(error);
                }
            }
        });
    }

    /**
     * Fecha a conexão
     */
    private end() {
        this.connection.end();
    }

    /**
     * Inicializa um transaction
     */
    public startTransaction() {
        this.start();
        this.transaction = true;
        this.query("SET AUTOCOMMIT=0;");
        this.query("START TRANSACTION;");
    }

    /**
     * Commit transaction
     */
    public commit() {
        this.query("COMMIT;");
        this.transaction = false;
        this.end();
    }

    /**
     * Roolback transaction
     */
    public rollback() {
        this.query("ROLLBACK;");
        this.transaction = false;
        this.end();
    }

    /**
     * Executa um comando sql
     * @param query SQL commando
     */
    public query(query: string, params?: any): Promise<any> {
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

            var sql = connection.query(query, (params) ? params : [], (error, results, fields) => {
                if (error) {

                    if (Config.DEBUG) console.log(error);

                    if (transaction) {
                        rollback();
                    }

                    reject(error);
                }
                else {
                    if (Config.DEBUG) console.log(sql.sql, results);

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

        var params = [];
        var query = ``;

        if (select) {
            query = `SELECT ${select.join(`,`)} `;
        } else {
            query = `SELECT * `;
        }

        query += `FROM ${table} `;

        if (where.length > 0) {
            let contWhere = 0;
            query += `WHERE `;
            for (var key in where) {
                if (contWhere > 0) {
                    query += ` AND `;
                }
                if (where[key].operator) {
                    query += `${where[key].col} ${where[key].operator} ?`;
                    params.push(where[key].value);
                } else {
                    query += `${where[key].col} = ?`;
                    params.push(where[key].value);
                }
                contWhere++;
            }
        }

        if (orderBy) {
            query += `ORDER BY ? `
            params.push(orderBy);
        }

        if (limit) {
            query += `LIMIT ? `
            params.push(limit);
        }

        if (offset) {
            query += `OFFSET ?`
            params.push(offset);
        }

        return this.query(query, params);
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
        var params = [];
        for (var key in itens) {
            col.push(key);
            values.push(`?`);
            params.push(itens[key]);
        }

        query += `(${col.join(`,`)}) VALUES (${values.join(`,`)});`;

        return this.query(query, params);
    }

    /**
     * Deleta linha no banco de dados
     * @param table 
     * @param where 
     */
    public delete(table: string, where: Array<WhereModel>) {
        var query = `DELETE FROM ${table} `;
        var params = [];

        if (where) {
            let contWhere = 0;
            query += `WHERE `;
            for (var key in where) {
                if (contWhere > 0) {
                    query += ` AND `;
                }
                if (where[key].operator) {
                    query += `${where[key].col} ${where[key].operator} ?`;
                    params.push(where[key].value);
                } else {
                    query += `${where[key].col} = ?`;
                    params.push(where[key].value);
                }
                contWhere++;
            }
        }

        return this.query(`${query};`, params);
    }

    /**
     * Atualiza linha banco de dados
     * @param table 
     * @param set 
     * @param where 
     */
    public update(table: string, set: any, where: Array<WhereModel>) {
        var params = [];
        var query = `UPDATE ${table} SET `;

        let cont = 0;
        for (var key in set) {
            if (cont > 0) {
                query += `,`;
            }

            query += `${key} = ? `;
            params.push(set[key]);
            cont++;
        }



        if (where) {
            let contWhere = 0;
            query += `WHERE `;
            for (var key in where) {
                if (contWhere > 0) {
                    query += ` AND `;
                }
                if (where[key].operator) {
                    query += `${where[key].col} ${where[key].operator} ?`;
                    params.push(where[key].value);
                } else {
                    query += `${where[key].col} = ?`;
                    params.push(where[key].value);
                }
                contWhere++;
            }
        }

        return this.query(`${query};`, params);
    }
}

