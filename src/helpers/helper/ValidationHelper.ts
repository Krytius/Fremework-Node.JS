import { Config } from '../../Config';
import { NextFunction } from 'express';
import { OutError } from '../index';

export class ValidationHelper {

    public valid(validations, params, next: NextFunction) {
        try {
            let validationsError: Array<string> = [];
            for (var key in validations) {
                for (var k in validations[key]) {
                    switch (validations[key][k]) {
                        case "required":
                            if (!this.required(params[key])) {
                                validationsError.push(`Campo ${key} requerido.`);
                            }
                            break;
                        case "number":
                            if (!this.number(params[key])) {
                                validationsError.push(`Campo ${key} não é o tipo number.`);
                            }
                            break;
                    }
                }
            }

            if(validationsError.length > 0) {
                throw validationsError;
            }

            return true;

        } catch (e) {
            let error: OutError = {
                code: 101,
                message: e[0],
                data: e
            };

            next(error);
            
            return false;
        }
    }

    private required(param) {

        if (typeof (param) == "undefined") {
            return false;
        }

        if (typeof (param) == "string") {
            if (param == "") {
                return false;
            }
        }

        return true;
    }

    private number(param) {

        if (typeof (param) == "undefined") {
            return false;
        }

        if (typeof (param) != "number") {
            return false;
        }

        return true;
    }


}