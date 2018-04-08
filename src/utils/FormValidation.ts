
export type FormValidator = (val: any) => boolean

export type ValidationRules = { [key: string] : FormValidator }

export type FormValidation = { [key: string] : boolean }

export type FormData = { [key: string] : any }

export function isFormValidationOk(formValidation: FormValidation): boolean {
    for (let key in formValidation) {
        if (formValidation[key] === true)
            return false
    }

    return true
}

export function validateForm(rules: ValidationRules, data: FormData, returnOnFirstError = false): any {
    let result = {}

    for (let key in rules) {
        let validator = rules[key]
        let val = data[key]

        let err = !validator(val)

        result[key + 'Err'] = err

        if (err && returnOnFirstError)
            return result
    }

    return result
}

export function validateFormByOne(rules: ValidationRules, data: FormData): string|null {
    for (let key in rules) {
        let validator = rules[key]
        let val = data[key]

        if (!validator(val))
            return key
    }

    return null
}

export function notBlankString(str: string): boolean {
    return !(!str || /^\s*$/.test(str))
}

export function positiveNumber(str: string): boolean {
    let num = parseInt(str, 10)

    return !isNaN(num) && (num > 0) && /^\d*$/.test(str)
}

export function lessThan(val: number, falseCb?: () => void): FormValidator {
    return str => {

        let num = parseInt(str, 10)

        if (num > val)
            falseCb && falseCb()

        return num <= val
    }
}

export function combineValidator(validator1: FormValidator, validator2: FormValidator): FormValidator {
    return str => {
        return validator1(str) && validator2(str)
    }
}