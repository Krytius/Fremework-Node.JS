import { createConnection } from "mysql";
import { NextFunction } from "express";
import { Config } from "../../Config";
import { TypeConnection, WhereModel, OutError } from "../..";

export class Mysql {

    private next: any;
    private connection;
    private transaction = false;

    constructor(next?: NextFunction) {
        this.next = (next) ? next : false;
    }

    /**
     * Connection Open
     */
    private start(type: TypeConnection) {

        switch (type) {
            case TypeConnection.WRITE:
                for (var key in Config.Connection) {
                    if (Config.Connection[key].type == TypeConnection.WRITE || Config.Connection[key].type == TypeConnection.ALL) {
                        this.connection = createConnection(Config.Connection[key]);
                    }
                }
                break;
            case TypeConnection.READ:
                for (var key in Config.Connection) {
                    if (Config.Connection[key].type == TypeConnection.READ || Config.Connection[key].type == TypeConnection.ALL) {
                        this.connection = createConnection(Config.Connection[key]);
                    }
                }
                break;
        }

        if(Config.DEBUG) {
            console.log("Connection Type", type, this.connection);
        }

        this.connection.connect((err) => {
            if (err) {
                console.error('Problema na conexão com o banco de dados.' + err.stack);
                let error: OutError = {
                    message: 'Problema na conexão com o banco de dados.',
                    code: 1000
                }

                if (typeof (this.next) == 'function') {
                    this.next(error);
                }
            }
        });
    }

    /**
     * Close connection
     */
    private end() {
        this.connection.end();
    }

    /**
     * Start the transaction
     */
    public startTransaction() {
        this.start(TypeConnection.WRITE);
        this.transaction = true;
        this.query(`SET AUTOCOMMIT=0;`);
        this.query(`START TRANSACTION;`);
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
     * Execute sql command
     * @param query SQL command
     */
    public query(query: string, params?: any): Promise<any> {
        let transaction = this.transaction;

        if (Config.DEBUG) {
            console.log(query);
        }

		// Not start connection in proccess the transaction
        if (!transaction) {
            if(/(INSERT|UPDATE|DELETE)/g.test(query)) {
                this.start(TypeConnection.WRITE);
            } else {
                this.start(TypeConnection.READ);
            }
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
     * Get itens
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

	/**
	 * Get one item
	 * @param table 
	 * @param id 
	 */
    public getRow(table: string, id: number) {
        var where = Object.assign(new Array<WhereModel>(), [{ col: `id`, value: id }])
        return this.get(table, [`*`], where);
    }

    /**
     * Insert item
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
     * Delete item
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
     * Update item
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

