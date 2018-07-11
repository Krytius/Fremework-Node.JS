import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { DBConnection, TypeConnection } from '../../interface';

export class EnvHelper {

	public static env(key: string) {
		let file = fs.readFileSync(`${path.join(__dirname, '../../../')}.env`);
		let envConfig = dotenv.parse(file);
		for (var k in envConfig) {
			if (k == key) {
				return envConfig[k];
			}
		}
	}

	public static bool(s: string): boolean {
		let regex = new RegExp(/(true|1|on)/gi);
		return regex.test(s);
	};

	public static envDB(): Array<DBConnection> {
		let itens = ['DB_HOST_', 'DB_USER_', 'DB_PASSWORD_', 'DB_DATABASE_'];
		let types = ['WRITE', 'READ'];
		let listConnections: Array<DBConnection> = [];

		for (var v of types) {
			var connection: DBConnection = {
				host: '',
				user: '',
				password: '',
				database: '',
				type: TypeConnection.ALL
			};

			for (var value of itens) {
				if (EnvHelper.env(`${value}${v}`) == '') {
					break;
				}

				switch (value) {
					case 'DB_HOST_':
						connection.host = EnvHelper.env(`${value}${v}`);
						break;
					case 'DB_USER_':
						connection.user = EnvHelper.env(`${value}${v}`);
						break;
					case 'DB_PASSWORD_':
						connection.password = EnvHelper.env(`${value}${v}`);
						break;
					case 'DB_DATABASE_':
						connection.database = EnvHelper.env(`${value}${v}`);
						break;
					default:
						break;
				}
			}

			if (v == "WRITE") {
				connection.type = TypeConnection.WRITE;
			} else {
				connection.type = TypeConnection.READ;
			}

			if (connection.database) {
				listConnections.push(connection);
			}
		}

		return listConnections;
	}

}