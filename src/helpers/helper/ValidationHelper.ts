export class ValidationHelper {

	/**
	 * Validate inputs
	 * @param validations 
	 * @param params 
	 */
    public valid(validations, params) {
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
            throw e;
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