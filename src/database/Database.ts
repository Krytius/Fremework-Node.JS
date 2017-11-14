import { Config } from "../Config";
import { Mysql } from "./drivers/Mysql";

export class Database {

    private static driver() {
        switch (Config.DatabaseType) {
            case `mysql`:
                return new Mysql();
            default:
                return new Mysql();
        }
    }

    public static query(query: string) {
        var driver = this.driver();
        return driver.query(query);
    }

    public static get(table: string, select?: Array<string>, where?: Array<WhereModel>, orderBy?: string, limit?: number, offset?: number) {
        var driver = this.driver();
        return driver.get(table, select, where, orderBy, limit, offset);
    }

    public static getRow(table: string, id: number) {
        var driver = this.driver();
        return driver.getRow(table, id);
    }

    public static insert(table: string, itens: Array<InsertModel>) {
        var driver = this.driver();
        return driver.insert(table, itens);
    }

    public static delete(table: string, where: Array<WhereModel>) {
        var driver = this.driver();
        return driver.delete(table, where);
    }

    public static update(table: string, set: Array<InsertModel>, where: Array<WhereModel>) {
        var driver = this.driver();
        return driver.update(table, set, where);
    }

}

export class WhereModel {
    col: string
    value: any
    operator: string
}

export class InsertModel {
    col: string
    value: any
}