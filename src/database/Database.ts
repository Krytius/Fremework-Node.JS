import { NextFunction } from "express";
import { Config } from "../Config";
import { Mysql } from "./drivers/Mysql";

export class Database {

    private driver;

    constructor(next?: NextFunction) {
        switch (Config.DatabaseType) {
            case `mysql`:
                this.driver = new Mysql(next);
            default:
                this.driver = new Mysql(next);
        }
    }

    /**
     * START TRANSACTION
     */
    public startTransaction() {
        this.driver.startTransaction();
    }

    /**
     * COMMIT
     */
    public commit() {
        this.driver.commit();
    }

    /**
     * ROLLBACK
     */
    public rollback() {
        this.driver.rollback();
    }

    /**
     * Executa comando SQL e retorna um result
     * @param query SQL
     */
    public query(query: string) {
        return this.driver.query(query);
    }

    /**
     * Monta um select baseado nos parâmetros passados
     * @param table 
     * @param select 
     * @param where 
     * @param orderBy 
     * @param limit 
     * @param offset 
     */
    public get(table: string, select?: Array<string>, where?: Array<WhereModel>, orderBy?: string, limit?: number, offset?: number) {
        return this.driver.get(table, select, where, orderBy, limit, offset);
    }

    /**
     * Monta um select baseado no id
     * @param table 
     * @param id 
     */
    public getRow(table: string, id: number) {
        return this.driver.getRow(table, id);
    }

    /**
     * Monta um insert baseado em um objeto json
     * @param table 
     * @param itens 
     */
    public insert(table: string, itens: any) {
        return this.driver.insert(table, itens);
    }

    /**
     * Monta um delete
     * @param table 
     * @param where 
     */
    public delete(table: string, where: Array<WhereModel>) {
        return this.driver.delete(table, where);
    }

    /**
     * Monta um update
     * @param table 
     * @param set 
     * @param where 
     */
    public update(table: string, set: any, where: Array<WhereModel>) {
        return this.driver.update(table, set, where);
    }

}

export class WhereModel {
    col: string;
    value: any;
    operator?: string = "=";
}