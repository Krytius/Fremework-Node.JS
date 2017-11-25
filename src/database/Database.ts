import { Config } from "../Config";
import { Mysql } from "./drivers/Mysql";

export class Database {

    private driver;

    constructor() {
        switch (Config.DatabaseType) {
            case `mysql`:
                this.driver = new Mysql();
            default:
                this.driver = new Mysql();
        }
    }

    public startTransaction() {
        this.driver.startTransaction();
    }

    public commit() {
        this.driver.commit();
    }

    public rollback() {
        this.driver.rollback();
    }

    public query(query: string) {
        return this.driver.query(query);
    }

    public get(table: string, select?: Array<string>, where?: Array<WhereModel>, orderBy?: string, limit?: number, offset?: number) {
        return this.driver.get(table, select, where, orderBy, limit, offset);
    }

    public getRow(table: string, id: number) {
        return this.driver.getRow(table, id);
    }

    public insert(table: string, itens: any) {
        return this.driver.insert(table, itens);
    }

    public delete(table: string, where: Array<WhereModel>) {
        return this.driver.delete(table, where);
    }

    public update(table: string, set: any, where: Array<WhereModel>) {
        return this.driver.update(table, set, where);
    }

}

export class WhereModel {
    col: string
    value: any
    operator: string
}