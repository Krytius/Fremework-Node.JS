import CryptoJS = require('crypto-js');
import { Config } from '../../Config';

export class CryptHelper {

	/**
	 * Encrypt for token .env
	 * @param item item encrypt
	 */
    public static encrypt(item: any) {
        return CryptoJS.AES.encrypt(`${item}`, Config.KEY).toString();
    }

	/**
	 * Decrypt for token .env
	 * @param item item decrypt
	 */
    public static decrypt(item: any) {
        return CryptoJS.AES.decrypt(`${item}`, Config.KEY).toString(CryptoJS.enc.Utf8);
    }


}