
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

export function validateForm(rules: ValidationRules, data: FormData): any {
    let result = {}

    for (let key in rules) {
        let validator = rules[key]
        let val = data[key]

        result[key + 'Err'] = validator(val)
    }

    return result
}

export function notBlankString(str: string): boolean {
    return (!str || /^\s*$/.test(str))
}

export function positiveNumber(str: string): boolean {
    let num = parseInt(str, 10)

    return !(!isNaN(num) && (num > 0) && /^\d*$/.test(str))
}