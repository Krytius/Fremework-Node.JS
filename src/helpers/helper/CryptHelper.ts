import CryptoJS = require('crypto-js');
import { Config } from '../../Config';



export class CryptHelper {

    public static encrypt(message) {
        return CryptoJS.AES.encrypt(message, Config.KEY).toString();
    }

    public static decrypt(message) {
        return CryptoJS.AES.decrypt(message, Config.KEY).toString(CryptoJS.enc.Utf8);
    }


}